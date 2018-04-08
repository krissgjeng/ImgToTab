class Options {
    constructor() { }
    save_options() {
        var tabtypeurl = document.getElementById('tabtype').value;
        //var likesColor = document.getElementById('like').checked;
        chrome.storage.local.set({
            tabtypeurl: tabtypeurl
        }, () => {
            // Update status to let user know options were saved.
            var status = document.getElementById('status');
            status.textContent = 'Options saved.';
            setTimeout(function () {
                status.textContent = '';
            }, 750);
        });
    }
    getSelectIndex(val, element) {
        for (let i = 0; i < element.options.length; i++) {
            const el = element.options[i];
            if (el.value == val)
                return i;
        }
        return 0; //return -1 if i cared for error checking
    }
    // Restores select box and checkbox state using the preferences
    // stored in chrome.storage.
    restore_options() {
        // Use default value color = 'red' and likesColor = true.
        chrome.storage.local.get({
            tabtypeurl: 'newtabSorted.html'
        }, (items) => {
            var elstatus = document.getElementById('tabtype');
            var index = this.getSelectIndex(items.tabtypeurl, elstatus);
            elstatus.selectedIndex = index;
        });
    }
}
document.addEventListener('DOMContentLoaded', () => {
    var opts = new Options();
    opts.restore_options();
    document.getElementById('save').addEventListener('click', () => opts.save_options());
});
