
var filter = [".jpg", ".png", ".gif", ".webm"];
function endswithFilter(link)
{
    for (var i = 0; i < filter.length; i++) {
        if (link.toLowerCase().endsWith(filter[i]))
            return true;
    }
    return false;
}

function checkTabType() {
    chrome.storage.local.get( 'tabtypeurl',
        function (item) {
            var url = "newtab.html"
            if (item.tabtypeurl != null)
                url = item.tabtypeurl;
            chrome.tabs.create({ url: url });
        });
}


function createTab(linkedImages) {
    //localStorage.setItem("images", JSON.stringify(images));
    //localStorage["images"] = images;
    chrome.storage.local.set({ images: linkedImages }, function () {
        checkTabType();
    });
}

function containsImage(image, images, index )
{
    for (var i = 0; i < images.length; i++) {
        if (index!= i && images[i].includes(image))
            return true;
    }
    return false;
}

function removePossibleDupes(images) {
    var uniqueimages = [];
    for (var i = 0; i < images.length; i++) {
        var im = images[i];
        var uniquefile = im.substring(im.lastIndexOf("/"));
        if (containsImage(uniquefile, images, i) == false) {
            uniqueimages.push(im);
        }
    }
    return uniqueimages;
}

function getimages(tab) {
    chrome.tabs.executeScript(
        {
            //getSource:// code: "document.getElementsByTagName('html')[0].innerHTML;"
            code: "var links = []; var ls = document.links; for (var i = 0; i < ls.length; i++) { links.push(ls[i].href) } links;"
        },
        function (ps1) {
            var images = [];
            var links = ps1[0];
            for (var i = 0; i < links.length; i++) {
                var link = links[i];

                //8chan fix
                if (link.startsWith("https://media.8ch.net")) {
                    link = link.slice(0, link.lastIndexOf("/"));
                }

                if (endswithFilter(link))
                {
                    if (images.indexOf(link) === -1) {
                        images.push(link);
                        }
                }
            }
            //alert(images.length);
            var uniqimages = removePossibleDupes(images);
            window.alert(uniqimages.length);
            createTab(uniqimages);
        }
    );
}

chrome.browserAction.onClicked.addListener(function (tab) {
    getimages(tab);
});