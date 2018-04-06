
function genlinks(images)
{
    var htmlCode = "";
    //var images = JSON.parse(localStorage.getItem("images"));
    //alert(images);
    for (var i = 0; i < (images.length); i++) { //for (var i = 0; i < (images.length > 7 ? 7 : images.length); i++) {
        if (images[i].toLowerCase().endsWith(".webm"))
            htmlCode += "<video controls><source src=" + images[i] + "></video><br>";
        else
            htmlCode += "<img src=" + images[i] + "><br>";
    }
    document.getElementById("images").innerHTML = htmlCode;
}

function loadImages() {
    chrome.storage.local.get({ images: [] },
        function (items) {
            genlinks(items.images);
        });
}
document.addEventListener('DOMContentLoaded', loadImages);