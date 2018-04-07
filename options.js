var Options = /** @class */ (function () {
    function Options() {
    }
    Options.prototype.save_options = function () {
        var tabtypeurl = document.getElementById('tabtype').value;
        //var likesColor = document.getElementById('like').checked;
        chrome.storage.local.set({
            tabtypeurl: tabtypeurl
        }, function () {
            // Update status to let user know options were saved.
            var status = document.getElementById('status');
            status.textContent = 'Options saved.';
            setTimeout(function () {
                status.textContent = '';
            }, 750);
        });
    };
    // Restores select box and checkbox state using the preferences
    // stored in chrome.storage.
    Options.prototype.restore_options = function () {
        // Use default value color = 'red' and likesColor = true.
        chrome.storage.sync.get({
            favoriteColor: 'red',
            likesColor: true
        }, function (items) {
            document.getElementById('color').value = items.favoriteColor;
            document.getElementById('like').checked = items.likesColor;
        });
    };
    return Options;
}());
var opts = new Options();
document.addEventListener('DOMContentLoaded', opts.restore_options);
document.getElementById('save').addEventListener('click', opts.save_options);
