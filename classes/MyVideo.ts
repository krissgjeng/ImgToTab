class MyVideo extends MyMedia {
    public url:string;
    public html:string;
    constructor(url:string) {
        super();
            this.url = url;
            this.html = '<video controls src="img/dummy.png"\
                class="lazy"\
                data-src="'+ url + '"></video>';
            //this.html = '<video controls><source src="img/dummy.png"\
            //    class="lazy"\
            //    data-src="'+ url + '"></video>';
    }
    
}