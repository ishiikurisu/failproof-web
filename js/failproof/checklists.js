/**
 * Returns an array of checklists in JSON format.
 */
function getChecklists() {
    var checklists = [];
    var raw = getCookie('checklists');

    
    if (raw.length > 0) {
        checklists = JSON.parse(raw);
    }

    return checklists;
}

/**
 * Adds a checklist to the memory.
 */
function addChecklist(checklist) {
    setCookie('checklists', JSON.stringify(getChecklists().concat(checklist)));
}

/**
 * Turns a checklist object into a string.
 */
function checklistToString(raw) {
    var outlet = raw.title + '\n';
    var items = raw.items;

    for (var i = 0; i < items.length; i++) {
        var item = items[i];
        outlet += (item.checked)? '[-] ' : '[ ] ';
        outlet += item.title + '\n';
    }

    return outlet;
}
