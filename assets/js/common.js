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
                "kind": "todo",
                "title": "To do item",
                "done": false
            }, {
                "kind": "todo",
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

/* TABLES */

function lineMd2Entry(line) {
    var fields = line.replace(/^\||\|$/gm, "").split('|');
    for (var j = 0; j < fields.length; j++) {
        fields[j] = fields[j].trim();
    }
    return fields;
}

/**
 * Converts a Markdown table into a FPCL block
 * @param inlet the markdown table as a string
 * @returns the FPCL block
 */
function tableMd2Fpcl(inlet) {
    var lines = inlet.split('\n');
    var state = "header";
    var fields = [ ];
    var entries = [ ];

    for (var i = 0; i < lines.length; i++) {
        var line = lines[i];
        switch (state) {
            case "header":
                fields = lineMd2Entry(line);
                state = "header detail";
                break;
            case "header detail":
                state = "entry";
                break;
            case "entry":
                if (line.length === 0) {
                    continue;
                }

                var values = lineMd2Entry(line);
                var entry = { };
                for (var j = 0; j < fields.length; j++) {
                    entry[fields[j]] = values[j];
                }
                entries.push(entry);
                break;
        }
    }

    return {
        kind: "table",
        entries: entries
    }
}

/**
 * Converts a FPCL block into a Markdown table
 * @param inlet the FPCL block
 * @returns the markdown table as a string
 */
function tableFpcl2Md(inlet) {

}

/* FPCL TO CHECKLISTS */

/**
 * Converts list of checklists as JS objects into a *.fpcl string
 * @param checklists array of checklists
 * @returns a string representing the checklist in the *.fpcl format
 */
function checklistsToFpcl(checklists) {
    var outlet = "";
    var listBreak = "";

    for (var i = 0; i < checklists.length; i++) {
        var checklist = checklists[i];
        var items = checklist.items;
        var box = `# ${decodeURIComponent(checklist.title)}\n\n`;
        for (var j = 0; j < items.length; j++) {
            var item = items[j];
            switch (item.kind) {
                case "note":
                    box += `${decodeURIComponent(item.title)}\n`;
                    break;
                case "todo":
                    var checked = `- [${(item.done)? "x" : " "}] `;
                    box += `${checked}${decodeURIComponent(item.title)}\n`;
                    break;

            }
        }
        outlet += `${listBreak}${box}`;
        listBreak = "\n";
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
    return 'note';
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
        currentState = identifyKind(line);

        switch (currentState) {
            case 'title':
                if (currentChecklist !== null) {
                    checklists.push(currentChecklist);
                }

                currentChecklist = {
                    'title': encodeURIComponent(line.substring(1).trim()),
                    'items': []
                };
                break;

            case 'todo':
                currentChecklist.items.push({
                    'kind': 'todo',
                    'title': encodeURIComponent(line.substring('- [ ]'.length).trim()),
                    'done': !!line.match(/^- \[x\]/)
                });
                break;

            case 'note':
                currentChecklist.items.push({
                    'kind': 'note',
                    'title': encodeURIComponent(line.trim())
                });
                break;

            default:
                // empty line
                continue;
        }
    }

    if (currentState !== 'title') {
        checklists.push(currentChecklist);
    }

    return checklists;
}
