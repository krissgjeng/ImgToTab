function genlinksLazy(images) {
    var htmlCode = "";
    //var images = JSON.parse(localStorage.getItem("images"));
    //alert(images);
    htmlCode += '<img src="img/dummy.png" height="1080" />' + "<br>";
    for (var i = 0; i < (images.length); i++) {
        if (images[i].toLowerCase().endsWith(".webm"))
            htmlCode += new MyVideo(images[i]).html + "<br>";
        else
            htmlCode += new MyImage(images[i]).html + "<br>";
    }
    document.getElementById("listing").innerHTML = htmlCode;
}
function loadImagesLazy() {
    chrome.storage.local.get({ images: [] }, function (items) {
        genlinksLazy(items.images);
        setLazy();
        //lazyLoad();
    });
}
registerListener('load', loadImagesLazy);
//registerListener('load', setLazy);
//registerListener('load', lazyLoad);
setTimeout(function () {
    registerListener('scroll', lazyLoad);
    alert("time");
}, 500);
var lazy; //or video?
function setLazy() {
    lazy = document.getElementsByClassName('lazy');
    console.log('Found ' + lazy.length + ' lazy images');
}
function lazyLoad() {
    for (var i = 0; i < lazy.length; i++) {
        if (isInViewport(lazy[i])) {
            if (lazy[i].getAttribute('data-src')) {
                lazy[i].src = lazy[i].getAttribute('data-src');
                lazy[i].removeAttribute('data-src');
            }
        }
    }
    cleanLazy();
}
function cleanLazy() {
    lazy = Array.prototype.filter.call(lazy, function (l) { return l.getAttribute('data-src'); });
}
function isInViewport(el) {
    var rect = el.getBoundingClientRect();
    return (rect.bottom >= 0 &&
        rect.right >= 0 &&
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.left <= (window.innerWidth || document.documentElement.clientWidth));
}
function registerListener(event, func) {
    if (window.addEventListener) {
        window.addEventListener(event, func);
    }
    else {
        window.attachEvent('on' + event, func);
    }
}
