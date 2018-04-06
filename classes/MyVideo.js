var MyVideo = /** @class */ (function () {
    function MyVideo(url) {
        this.url = url;
        this.html = '<video controls src="img/dummy.png"\
                class="lazy"\
                data-src="' + url + '"></video>';
        //this.html = '<video controls><source src="img/dummy.png"\
        //    class="lazy"\
        //    data-src="'+ url + '"></video>';
    }
    return MyVideo;
}());
