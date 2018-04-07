class MyImage extends MyMedia {
    constructor(url, lazy = false) {
        super();
        this.url = url;
        this.html = lazy ? '<img src="img/dummy.png"\
        class="lazy"\
        data-src="' + url + '"/>' :
            '<img src="' + url + '"/>';
    }
}
