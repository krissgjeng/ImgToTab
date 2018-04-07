var Eventscript = /** @class */ (function () {
    function Eventscript() {
        this.filter = [".jpg", ".png", ".gif", ".webm"];
    }
    Eventscript.prototype.endswithFilter = function (link) {
        for (var i = 0; i < this.filter.length; i++) {
            if (link.toLowerCase().endsWith(this.filter[i]))
                return true;
        }
        return false;
    };
    Eventscript.prototype.checkTabType = function () {
        chrome.storage.local.get('tabtypeurl', function (item) {
            var url = "newtab.html";
            if (item.tabtypeurl != null)
                url = item.tabtypeurl;
            chrome.tabs.create({ url: url });
        });
    };
    Eventscript.prototype.createTab = function (linkedImages) {
        //localStorage.setItem("images", JSON.stringify(images));
        //localStorage["images"] = images;
        chrome.storage.local.set({ images: linkedImages }, function () {
            this.checkTabType();
        });
    };
    Eventscript.prototype.containsImage = function (image, images, index) {
        for (var i = 0; i < images.length; i++) {
            if (index != i && images[i].includes(image))
                return true;
        }
        return false;
    };
    Eventscript.prototype.removePossibleDupes = function (images) {
        var uniqueimages = [];
        for (var i = 0; i < images.length; i++) {
            var im = images[i];
            var uniquefile = im.substring(im.lastIndexOf("/"));
            if (this.containsImage(uniquefile, images, i) == false) {
                uniqueimages.push(im);
            }
        }
        return uniqueimages;
    };
    Eventscript.prototype.GetImages = function (tab) {
        chrome.tabs.executeScript({
            //getSource:// code: "document.getElementsByTagName('html')[0].innerHTML;"
            code: "var links = []; var ls = document.links; for (var i = 0; i < ls.length; i++) { links.push(ls[i].href) } links;"
        }, function (ps1) {
            var images = [];
            var links = ps1[0];
            for (var i = 0; i < links.length; i++) {
                var link = links[i];
                //8chan fix
                if (link.startsWith("https://media.8ch.net")) {
                    link = link.slice(0, link.lastIndexOf("/"));
                }
                if (this.endswithFilter(link)) {
                    if (images.indexOf(link) === -1) {
                        images.push(link);
                    }
                }
            }
            //alert(images.length);
            var uniqimages = this.removePossibleDupes(images);
            window.alert(uniqimages.length);
            this.createTab(uniqimages);
        });
    };
    return Eventscript;
}());
chrome.browserAction.onClicked.addListener(function (tab) {
    new Eventscript().GetImages(tab);
});
