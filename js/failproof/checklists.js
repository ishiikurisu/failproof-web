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
 * @param checklist a checklist string
 */
function addChecklist(checklist) {
    setCookie('checklists', JSON.stringify(getChecklists().concat(checklist)));
}

/**
 * Turns a checklist object into a string.
 */
function checklistToString(raw) {
    return JSON.stringify(raw);
}

/**
 * Parses a string into a checklist
 * @param s the string object containing a checklist object.
 */
function stringToChecklist(s) {
    return JSON.parse(s);
}

/**
 * Creates an empty checklist
 */
function getEmptyChecklist() {
    return {
        "title": "New checklist",
        "items": [
            {
                "title": "First item",
                "checked": false
            }
        ]
    };
}