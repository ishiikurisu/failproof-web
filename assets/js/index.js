/**
 * Loads checklists from memory
 * @returns a list of checklist objects
 */
function loadChecklists() {
    // TODO load checklists from storage
    return [];
}

/**
 * Creates a dummy checklist. Should be used as template for remaining
 * checklists
 */
function createDummyChecklist() {
    return {
        "title": "Your first checklist",
        "items": [
            {
                "title": "To do item",
                "done": false
            }, {
                "title": "Done item",
                "done": true
            }
        ]
    }
}

/**
 * Saves checklists on local storage
 * @param checklists list of checklist objects
 */
function saveChecklists(checklists) {
    // TODO store checklists on local storage
}

/**
 * Call when the page is first loaded
 */
function main() {
    var checklists = loadChecklists();
    if (checklists.length === 0) {
        checklists.push(createDummyChecklist());
    }

    // TODO draw checklists

    saveChecklists(checklists);
}
