//class Idownload {
//    Id: number;
//    Name: string;
//    Status:string="created";
//    constructor(id:number, name:string) {
//        this.Id=id;
//        this.Name=name;
//    }
//}
class NewTabSorted {
    constructor() { }
    genlinks(images) {
        var imagehtml = "";
        var videohtml = "";
        var flashhtml = "";
        //var images = JSON.parse(localStorage.getItem("images"));
        //alert(images);
        for (var i = 0; i < (images.length); i++) { //for (var i = 0; i < (images.length > 7 ? 7 : images.length); i++) {
            if (images[i].toLowerCase().endsWith(".webm")) {
                var vid = new MyVideo(images[i]);
                NewTabSorted.media.push(vid);
                videohtml += vid.html + "<br>";
            }
            else if (images[i].toLowerCase().endsWith(".swf")) {
                var flash = new MyFlash(images[i]);
                NewTabSorted.media.push(flash);
                flashhtml += flash.html + "<br>";
            }
            else {
                var img = new MyImage(images[i]);
                NewTabSorted.media.push(img);
                imagehtml += img.html + "<br>";
            }
        }
        //alert(NewTab.media.length);
        document.getElementById("images").innerHTML = imagehtml;
        document.getElementById("videos").innerHTML = videohtml;
        document.getElementById("flash").innerHTML = flashhtml;
    }
    loadImages() {
        chrome.storage.local.get({ images: [] }, (items) => {
            this.genlinks(items.images);
        });
    }
    downloadM(media, index = null) {
        chrome.downloads.download({ url: media.url, filename: "imgintab/" + (index != null ? index.toString() + "_" + media.fileName : media.fileName) }, (dlid) => {
            NewTabSorted.downloads.push(dlid);
        });
    }
    downloadMedia() {
        alert("clicked downloadall for: " + NewTabSorted.media);
        //for (let i = 0; i < NewTab.media.length; i++) {
        //    const element = NewTab.media[i]; 
        //}
        var dlnr = 1;
        chrome.downloads.onChanged.addListener(download => {
            if (NewTabSorted.downloads.indexOf(download.id) > -1) {
                //alert("changed"+download.state.current);
                if (download.state.current == "complete" && dlnr < NewTabSorted.media.length) {
                    this.downloadM(NewTabSorted.media[dlnr], dlnr);
                    dlnr++;
                }
            }
        });
        this.downloadM(NewTabSorted.media[0], 0);
    }
    ToggleCollapse(name) {
        if (document.getElementById(name).style.display == "none")
            document.getElementById(name).style.display = "block";
        else
            document.getElementById(name).style.display = "none";
    }
}
NewTabSorted.media = new Array();
NewTabSorted.downloads = new Array();
document.addEventListener('DOMContentLoaded', () => {
    var nts = new NewTabSorted();
    nts.loadImages();
    document.getElementById("dlmedia").onclick = () => nts.downloadMedia();
    document.getElementById("videosCollapse").onclick = () => nts.ToggleCollapse("videos");
    document.getElementById("imagesCollapse").onclick = () => nts.ToggleCollapse("images");
    document.getElementById("flashCollapse").onclick = () => nts.ToggleCollapse("flash");
});
