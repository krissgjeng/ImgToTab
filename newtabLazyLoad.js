var NewTabLazy = /** @class */ (function () {
    function NewTabLazy() {
        setTimeout(function () {
            registerListener('scroll', this.lazyLoad);
            alert("time");
        }, 500);
    }
    NewTabLazy.prototype.genlinks = function (images) {
        var htmlCode = "";
        //var images = JSON.parse(localStorage.getItem("images"));
        //alert(images);
        htmlCode += '<img src="img/dummy.png" height="1080" />' + "<br>";
        for (var i = 0; i < (images.length); i++) { //for (var i = 0; i < (images.length > 7 ? 7 : images.length); i++) {
            if (images[i].toLowerCase().endsWith(".webm")) {
                var vid = new MyVideo(images[i]);
                this.media.push(vid);
                htmlCode += vid.html + "<br>";
            }
            else {
                var img = new MyImage(images[i]);
                this.media.push(img);
                htmlCode += img.html + "<br>";
            }
        }
        document.getElementById("listing").innerHTML = htmlCode;
    };
    NewTabLazy.prototype.loadImages = function () {
        chrome.storage.local.get({ images: [] }, function (items) {
            this.genlinks(items.images);
            this.setLazy();
            //lazyLoad();
        });
    };
    NewTabLazy.prototype.setLazy = function () {
        this.lazy = document.getElementsByClassName('lazy');
        console.log('Found ' + this.lazy.length + ' lazy images');
    };
    NewTabLazy.prototype.lazyLoad = function () {
        for (var i = 0; i < this.lazy.length; i++) {
            if (this.isInViewport(this.lazy[i])) {
                if (this.lazy[i].getAttribute('data-src')) {
                    this.lazy[i].setAttribute("src", this.lazy[i].getAttribute('data-src'));
                    this.lazy[i].removeAttribute('data-src');
                }
            }
        }
        this.cleanLazy();
    };
    NewTabLazy.prototype.cleanLazy = function () {
        this.lazy = Array.prototype.filter.call(this.lazy, function (l) { return l.getAttribute('data-src'); });
    };
    NewTabLazy.prototype.isInViewport = function (el) {
        var rect = el.getBoundingClientRect();
        return (rect.bottom >= 0 &&
            rect.right >= 0 &&
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.left <= (window.innerWidth || document.documentElement.clientWidth));
    };
    return NewTabLazy;
}());
function registerListener(event, func) {
    window.addEventListener(event, func);
}
var ntl = new NewTabLazy();
window.addEventListener('load', ntl.loadImages);
