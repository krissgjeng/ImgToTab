class MyImage {
    public url:string;
    public html:string;
    
    constructor(url:string) {
    this.url = url;
    this.html = '<img src="img/dummy.png"\
        class="lazy"\
        data-src="'+ url + '"/>';
    }
}