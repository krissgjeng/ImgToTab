class NewTabLazy {

    public lazy: HTMLCollectionOf<HTMLElement>;
    public static media = new Array<MyMedia>();
    public static downloads = new Array<number>();

    constructor() {
        setTimeout( ()=> {
            document.addEventListener('scroll', ()=>this.lazyLoad());
        }, 500);
    }
    private genlinks(images) {
        var htmlCode = "";
        //var images = JSON.parse(localStorage.getItem("images"));
        //alert(images);
        htmlCode += '<img src="img/dummy.png" height="1080" />' + "<br>";
        for (var i = 0; i < (images.length); i++) { //for (var i = 0; i < (images.length > 7 ? 7 : images.length); i++) {
            if (images[i].toLowerCase().endsWith(".webm"))
            {
                var vid =new MyVideo(images[i],true);
                NewTabLazy.media.push(vid);
                htmlCode += vid.html + "<br>";
            }
            else if (images[i].toLowerCase().endsWith(".swf"))
            {
                var flash =new MyFlash(images[i]);
                NewTabLazy.media.push(flash);
                htmlCode += flash.html + "<br>";
            }
            else
            {
                var img =new MyImage(images[i],true);
                NewTabLazy.media.push(img);
                htmlCode += img.html + "<br>";
            }
        }
        document.getElementById("listing").innerHTML = htmlCode;
    }

    public loadImages() {
        chrome.storage.local.get({ images: [] },
            (items)=> {
                this.genlinks(items.images);
                this.setLazy();
                //lazyLoad();
            });
    }

    private setLazy() {
        this.lazy = <HTMLCollectionOf<HTMLElement>>document.getElementsByClassName('lazy');
        console.log('Found ' + this.lazy.length + ' lazy images');
    }

    private lazyLoad() {
        for (var i = 0; i < this.lazy.length; i++) {
            if (this.isInViewport(this.lazy[i])) {
                if (this.lazy[i].getAttribute('data-src')) {
                    this.lazy[i].setAttribute("src", this.lazy[i].getAttribute('data-src'));
                    this.lazy[i].removeAttribute('data-src');
                }
            }
        }
    
        this.cleanLazy();
    }
    
    private cleanLazy() {
        this.lazy = Array.prototype.filter.call(this.lazy, function (l) { return l.getAttribute('data-src'); });
    }
    
    private isInViewport(el) {
        var rect = el.getBoundingClientRect();
    
        return (
            rect.bottom >= 0 &&
            rect.right >= 0 &&
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.left <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    public downloadM(media:MyMedia,index:number=null) {
        var dlf = (<HTMLInputElement>document.getElementById("dlfolder")).value;
        var dlfolder = dlf ?  "imgintab/"+dlf+"/" : "imgintab/";
        chrome.downloads.download({url: media.url, filename: dlfolder+( index!=null ? index.toString()+"_"+media.fileName :media.fileName )},(dlid)=>{
            NewTabLazy.downloads.push(dlid);
        });
    }

    public downloadMedia()
    {

        alert("clicked downloadall for: "+NewTabLazy.media);
        //for (let i = 0; i < NewTab.media.length; i++) {
        //    const element = NewTab.media[i]; 
        //}
        var dlnr = 1;
        chrome.downloads.onChanged.addListener(download=>{
            
            if(NewTabLazy.downloads.indexOf(download.id)>-1)
            {
                //alert("changed"+download.state.current);
                if(download.state.current=="complete")
                {
                    if(dlnr < NewTabLazy.media.length)
                    {
                        chrome.downloads.erase({id: download.id}, null);
                        this.downloadM(NewTabLazy.media[dlnr],dlnr);
                        dlnr++;
                    }
                    else if(dlnr==NewTabLazy.media.length)
                    {
                        chrome.downloads.erase({id: download.id}, null);
                    }
                }
            }
        });
        this.downloadM(NewTabLazy.media[0],0);
    }
}

function registerListener(event, func) {
        window.addEventListener(event, func)
}

document.addEventListener('DOMContentLoaded', ()=> { 
    var ntl = new NewTabLazy();
    ntl.loadImages();
    document.getElementById("dlmedia").onclick = () => ntl.downloadMedia();
});