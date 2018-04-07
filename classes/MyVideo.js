class MyVideo extends MyMedia {
    constructor(url, lazy = false) {
        super();
        this.url = url;
        this.html = lazy ? '<video controls src="img/dummy.png"\
                class="lazy"\
                data-src="' + url + '"></video>' :
            '<video controls src="' + url + '"></video>';
    }
}
