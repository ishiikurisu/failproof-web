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
 * Generates a card to display on the list view
 * @param checklist the checklist to be used as reference
 * @returns the HTML for the checklist card following the standard set by the
 *          home page
 */
function generateChecklistCard(checklist) {
    return `
    <div class="email-item pure-g">
        <div class="pure-u">
            <img width="64" height="64" alt="Checklist" class="email-avatar" src="https://via.placeholder.com/64/FFCD8A/000000/?text=Checklist">
        </div>

        <div class="pure-u-3-4">
            <h5 class="email-name">` + checklist.title + `</h5>
            <p class="email-desc">
                ` + "TODO list items to do and trim them" + `
            </p>
        </div>
    </div>`;
}

/**
 * Call when the page is first loaded
 */
function main() {
    var checklists = loadChecklists();
    if (checklists.length === 0) {
        checklists.push(createDummyChecklist());
    }

    var checklistsHTML = "";
    for (var i = 0; i < checklists.length; i++) {
        checklistsHTML += generateChecklistCard(checklists[i]);
    }
    document.getElementById('list').innerHTML = checklistsHTML;

    saveChecklists(checklists);
}
