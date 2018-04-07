class Eventscript {
    private filter = [".jpg", ".png", ".gif", ".webm"];

    constructor() { }

    private endswithFilter(link:string) {
        for (var i = 0; i < this.filter.length; i++) {
            if (link.toLowerCase().endsWith(this.filter[i]))
                return true;
        }
        return false;
    }

    private checkTabType() {
        chrome.storage.local.get('tabtypeurl',
            function (item) {
                var url = "newtab.html"
                if (item.tabtypeurl != null)
                    url = item.tabtypeurl;
                chrome.tabs.create({ url: url });
            });
    }

    private createTab(linkedImages) {
        //localStorage.setItem("images", JSON.stringify(images));
        //localStorage["images"] = images;
        chrome.storage.local.set({ images: linkedImages }, () => {
            this.checkTabType();
        });
    }

    private containsImage(image, images, index) {
        for (var i = 0; i < images.length; i++) {
            if (index != i && images[i].includes(image))
                return true;
        }
        return false;
    }

    private removePossibleDupes(images) {
        var uniqueimages = [];
        for (var i = 0; i < images.length; i++) {
            var im = images[i];
            var uniquefile = im.substring(im.lastIndexOf("/"));
            if (this.containsImage(uniquefile, images, i) == false) {
                uniqueimages.push(im);
            }
        }
        return uniqueimages;
    }

    public GetImages(tab) {
        chrome.tabs.executeScript(
            {
                //getSource:// code: "document.getElementsByTagName('html')[0].innerHTML;"
                code: "var links = []; var ls = document.links; for (var i = 0; i < ls.length; i++) { links.push(ls[i].href) } links;"
            },
            (ps1) => {
                var images = new Array<string>();
                var links = ps1[0];
                for (var i = 0; i < links.length; i++) {
                    var link:string = links[i];
                    //8chan fix
                    if (link.startsWith("https://media.8ch.net")) {
                        link = link.slice(0, link.lastIndexOf("/"));
                    }
                    if (this.endswithFilter(link)) {
                        if (images.indexOf(link) === -1) {
                            //alert(link);
                            images.push(link);
                        }
                    }
                }
                //alert(images.length);
                var uniqimages = this.removePossibleDupes(images);
                window.alert(uniqimages.length);
                this.createTab(uniqimages);
            }
        );
    }

}

chrome.browserAction.onClicked.addListener(function (tab) {
    var ev = new Eventscript();
    ev.GetImages(tab);
});