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

/* FPCL TO CHECKLISTS */

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
        var box = `# ${checklist.title}\n\n`;
        for (var j = 0; j < items.length; j++) {
            var item = items[j];
            var checked = `- [${(item.done)? "x" : " "}] `
            box += `${checked}${item.title}\n`
        }
        outlet += box;
    }

    return outlet;
}

/* FPCL TO CHECKLISTS */

function identifyKind(line) {
    let kinds = [
        {
            name: 'title',
            regex: /^#(.*)/
        },
        {
            name: 'todo',
            regex: /^- \[[\sx]\](.*)/
        },
        {
            name: 'empty',
            regex: /^(?![\s\S])/
        }
    ];
    var noKind = kinds.length;
    for (var i = 0; i < noKind; i++) {
        var kind = kinds[i];
        var match = line.match(kind.regex);
        if (match) {
            return kind.name;
        }
    }
    return null;
}

/**
 * Converts a markdown string into an array of checklists
 * @param md string representation of a checklist
 * @returns array of checklists
 */
function fpclToChecklists(md) {
    var checklists = [];
    var lines = md.split('\n');
    var currentChecklist = null;
    var currentState = "title";

    for (var i = 0; i < lines.length; i++) {
        var line = lines[i];
        var kind = identifyKind(line);

        switch (kind) {
            case 'title':
                if (currentChecklist !== null) {
                    checklists.push(currentChecklist);
                }
                // TODO extract title
                currentChecklist = {
                    'title': null
                };
                break;

            case 'todo':
                // TODO get task state
                // TODO get task title
                // TODO append to current checklist
                break;

            default: // empty line
                continue;
        }
    }

    return checklists;
}
