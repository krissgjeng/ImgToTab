//class Idownload {
//    Id: number;
//    Name: string;
//    Status:string="created";
//    constructor(id:number, name:string) {
//        this.Id=id;
//        this.Name=name;
//    }
//}
class NewTab {
    constructor() {
    }
    genlinks(images) {
        var htmlCode = "";
        //var images = JSON.parse(localStorage.getItem("images"));
        //alert(images);
        for (var i = 0; i < (images.length); i++) { //for (var i = 0; i < (images.length > 7 ? 7 : images.length); i++) {
            if (images[i].toLowerCase().endsWith(".webm")) {
                var vid = new MyVideo(images[i]);
                NewTab.media.push(vid);
                htmlCode += vid.html + "<br>";
            }
            else {
                var img = new MyImage(images[i]);
                NewTab.media.push(img);
                htmlCode += img.html + "<br>";
            }
        }
        alert(NewTab.media.length);
        document.getElementById("images").innerHTML = htmlCode;
    }
    loadImages() {
        chrome.storage.local.get({ images: [] }, (items) => {
            this.genlinks(items.images);
        });
    }
    downloadM(media) {
        chrome.downloads.download({ url: media.url, filename: "imgintab/" + media.fileName }, (dlid) => {
            NewTab.downloads.push(dlid);
        });
    }
    downloadMedia() {
        alert("clicked downloadall for: " + NewTab.media);
        //for (let i = 0; i < NewTab.media.length; i++) {
        //    const element = NewTab.media[i]; 
        //}
        var dlnr = 1;
        chrome.downloads.onChanged.addListener(download => {
            if (NewTab.downloads.indexOf(download.id) > -1) {
                alert("changed" + download.state);
                if (download.state == "complete" && dlnr < NewTab.media.length) {
                    this.downloadM(NewTab.media[dlnr]);
                    dlnr++;
                }
            }
        });
        this.downloadM(NewTab.media[0]);
    }
}
//public images;
NewTab.media = new Array();
NewTab.downloads = new Array();
document.addEventListener('DOMContentLoaded', function () {
    var nt = new NewTab();
    nt.loadImages();
    document.getElementById("dlmedia").onclick = () => nt.downloadMedia();
});
