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
 * @param checklists array of checklists
 * @returns a string representing the checklist in the *.fpcl format
 */
function checklistsToFpcl(checklists) {
    var outlet = "";

    for (var i = 0; i < checklists.length; i++) {
        var checklist = checklists[i];
        var items = checklist.items;
        var box = `${checklist.title}\n`;
        for (var j = 0; j < items.length; j++) {
            var item = items[j];
            var checked = (item.done)? "+" : "-";
            box += `${checked}${item.title}\n`
        }
        box += "\n";
        outlet += box;
    }

    return outlet;
}

/**
 * Converts a *.fpcl string into an array of checklists
 * @param fpcl string representation of a checklist
 * @returns array of checklists
 */
function fpclToChecklists(fpcl) {
    var checklists = [];
    var lines = fpcl.split('\n');
    var currentChecklist = null;
    var currentState = "title";

    for (var i = 0; i < lines.length; i++) {
        var line = lines[i];
        switch (currentState) {
            case "title":
                currentChecklist = {
                    "title": line,
                    "items": []
                }
                currentState = "item";
                break;
            case "item":
                if (line.length === 0) {
                    checklists.push(currentChecklist);
                    currentState = "title";
                } else {
                    var item = {
                        "title": line.substring(1),
                        "done": line[0] === '+'
                    }
                    currentChecklist.items.push(item);
                }
                break;
        }
    }

    return checklists;
}
