﻿class MyFlash extends MyMedia {
    public url:string;
    public html:string;
    
    constructor(url:string, lazy:boolean=false) {
        super();
    this.url = url;
    this.html = lazy ? '<embed src="img/dummy.png"\
        class="lazy"\
        data-src="'+ url + '"/>' :
        '<object><embed src="'+url+'"/></object>';
    }
}