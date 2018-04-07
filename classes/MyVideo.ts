class MyVideo extends MyMedia {
    public url:string;
    public html:string;
    constructor(url:string, lazy:boolean=false) {
        super();
            this.url = url;
            this.html = lazy ? '<video controls src="img/dummy.png"\
                class="lazy"\
                data-src="'+ url + '"></video>' : 
                '<video controls src="'+url+'"></video>';
    }
    
}