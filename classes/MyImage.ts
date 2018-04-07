class MyImage extends MyMedia {
    public url:string;
    public html:string;
    
    constructor(url:string, lazy:boolean=false) {
        super();
    this.url = url;
    this.html = lazy ? '<img src="img/dummy.png"\
        class="lazy"\
        data-src="'+ url + '"/>' :
        '<img src="'+url+'"/>';
    }
}