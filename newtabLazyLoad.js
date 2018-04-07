class NewTabLazy {
    constructor() {
        setTimeout(() => {
            registerListener('scroll', this.lazyLoad);
            alert("time");
        }, 500);
    }
    genlinks(images) {
        var htmlCode = "";
        //var images = JSON.parse(localStorage.getItem("images"));
        //alert(images);
        htmlCode += '<img src="img/dummy.png" height="1080" />' + "<br>";
        for (var i = 0; i < (images.length); i++) { //for (var i = 0; i < (images.length > 7 ? 7 : images.length); i++) {
            if (images[i].toLowerCase().endsWith(".webm")) {
                var vid = new MyVideo(images[i], true);
                NewTabLazy.media.push(vid);
                htmlCode += vid.html + "<br>";
            }
            else if (images[i].toLowerCase().endsWith(".swf")) {
                var flash = new MyFlash(images[i]);
                NewTab.media.push(flash);
                htmlCode += flash.html + "<br>";
            }
            else {
                var img = new MyImage(images[i], true);
                NewTabLazy.media.push(img);
                htmlCode += img.html + "<br>";
            }
        }
        document.getElementById("listing").innerHTML = htmlCode;
    }
    loadImages() {
        chrome.storage.local.get({ images: [] }, (items) => {
            this.genlinks(items.images);
            this.setLazy();
            //lazyLoad();
        });
    }
    setLazy() {
        this.lazy = document.getElementsByClassName('lazy');
        console.log('Found ' + this.lazy.length + ' lazy images');
    }
    lazyLoad() {
        for (var i = 0; i < this.lazy.length; i++) {
            if (this.isInViewport(this.lazy[i])) {
                if (this.lazy[i].getAttribute('data-src')) {
                    this.lazy[i].setAttribute("src", this.lazy[i].getAttribute('data-src'));
                    this.lazy[i].removeAttribute('data-src');
                }
            }
        }
        this.cleanLazy();
    }
    cleanLazy() {
        this.lazy = Array.prototype.filter.call(this.lazy, function (l) { return l.getAttribute('data-src'); });
    }
    isInViewport(el) {
        var rect = el.getBoundingClientRect();
        return (rect.bottom >= 0 &&
            rect.right >= 0 &&
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.left <= (window.innerWidth || document.documentElement.clientWidth));
    }
    downloadM(media, index = null) {
        chrome.downloads.download({ url: media.url, filename: "imgintab/" + (index != null ? index.toString() + "_" + media.fileName : media.fileName) }, (dlid) => {
            NewTabLazy.downloads.push(dlid);
        });
    }
    downloadMedia() {
        alert("clicked downloadall for: " + NewTabLazy.media);
        //for (let i = 0; i < NewTab.media.length; i++) {
        //    const element = NewTab.media[i]; 
        //}
        var dlnr = 1;
        chrome.downloads.onChanged.addListener(download => {
            if (NewTabLazy.downloads.indexOf(download.id) > -1) {
                //alert("changed"+download.state.current);
                if (download.state.current == "complete" && dlnr < NewTabLazy.media.length) {
                    this.downloadM(NewTabLazy.media[dlnr], dlnr);
                    dlnr++;
                }
            }
        });
        this.downloadM(NewTabLazy.media[0], 0);
    }
}
NewTabLazy.media = new Array();
NewTabLazy.downloads = new Array();
function registerListener(event, func) {
    window.addEventListener(event, func);
}
document.addEventListener('DOMContentLoaded', () => {
    var ntl = new NewTabLazy();
    ntl.loadImages();
    document.getElementById("dlmedia").onclick = () => ntl.downloadMedia();
});
