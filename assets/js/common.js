// #####################
// # MEMORY MANAGEMENT #
// #####################

/**
 * Loads checklists from memory
 * @returns a list of checklist objects
 */
function loadChecklists() {
    var rawChecklists = getCookie('checklists');
    var checklists = [];

    if (!!rawChecklists) {
        checklists = JSON.parse(rawChecklists);
    }

    return checklists;
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
    setCookie('checklists', JSON.stringify(checklists));
}

// ##################
// # API MANAGEMENT #
// ##################

/**
 * Converts list of checklists as JS objects into a *.fpcl string
 * @param checklist array of checklists
 * @returns a string representing the checklist in the *.fpcl format
 */
function checklistsToFpcl(checklist) {
    // TODO implement me!
    return "";
}

/**
 * Converts a *.fpcl string into an array of checklists
 * @param fpcl string representation of a checklist
 * @returns array of checklists
 */
function fpclToChecklists(fpcl) {
    // TODO implement me!
    return [];
}
