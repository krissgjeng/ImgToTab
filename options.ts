class Options {

  constructor() { }

  public save_options() {
    var tabtypeurl = (<HTMLInputElement>document.getElementById('tabtype')).value;
    //var likesColor = document.getElementById('like').checked;

    chrome.storage.local.set({
      tabtypeurl: tabtypeurl
    },
      function () {
        // Update status to let user know options were saved.
        var status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(function () {
          status.textContent = '';
        }, 750);
      });
  }

  // Restores select box and checkbox state using the preferences
  // stored in chrome.storage.
  public restore_options() {
    // Use default value color = 'red' and likesColor = true.
    chrome.storage.sync.get({
      favoriteColor: 'red',
      likesColor: true
    }, function (items) {
      (<HTMLInputElement>document.getElementById('color')).value = items.favoriteColor;
      (<HTMLInputElement>document.getElementById('like')).checked = items.likesColor;
    });
  }

}

document.addEventListener('DOMContentLoaded', ()=>{
  var opts = new Options();
  opts.restore_options();
  document.getElementById('save').addEventListener('click',()=>
  opts.save_options());
});
