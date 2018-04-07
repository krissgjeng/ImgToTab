class MyFlash extends MyMedia {
    constructor(url, lazy = false) {
        super();
        this.url = url;
        this.html = lazy ? '<embed src="img/dummy.png"\
        class="lazy"\
        data-src="' + url + '"/>' :
            '<object><embed src="' + url + '"/></object>';
    }
}
