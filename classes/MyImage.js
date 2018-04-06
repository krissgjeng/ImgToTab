var MyImage = /** @class */ (function () {
    function MyImage(url) {
        this.url = url;
        this.html = '<img src="img/dummy.png"\
        class="lazy"\
        data-src="' + url + '"/>';
    }
    return MyImage;
}());
