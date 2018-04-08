class MyFlash extends MyMedia {
    constructor(url, lazy = false) {
        super();
        this.url = url;
        this.html = lazy ? '<embed src="img/dummy.png"\
        class="lazy"\
        data-src="' + url + '"/>' :
            '<embed type="application/x-shockwave-flash" src="' + url + '"/>';
    }
}
