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

// #####################
// # DRAWING FUNCTIONS #
// #####################

/**
 * Generates a card to display on the list view. When it is clicked, it should
 * be displayed on the main content div.
 * @param checklists the list of all checklists
 * @param i the reference checklist
 * @returns the HTML for the checklist card following the standard set by the
 *          home page
 */
function generateChecklistCard(checklists, i) {
    var checklist = checklists[i];
    return `
    <div class="email-item pure-g" onclick="displayChecklist(` + i + `)" id="checklist-` + i + `">
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
 * Generates the main div content for a checklist
 * @param checklists the list of all checklists
 * @param index the reference checklist
 * @retuns the HTML for the checklist content following the standard set by the
 *         home page
 */
function generateChecklistContent(checklists, index) {
    var checklist = checklists[index];
    var checklistBody = "";

    // TODO move items around
    for (var i = 0; i < checklist.items.length; i++) {
        var item = checklist.items[i];
        var checkboxId = "checkbox-" + index + "-" + i;
        var textId = "text-" + index + "-" + i;
        var checked = (item.done)? "checked" : "";
        var itemBody = `
            <p>
                <input type="checkbox" id="${checkboxId}" name="checkbox" value="${checkboxId}" ${checked}>
                <input type="text" id="label-${checkboxId}" class="textboxLabel editable-title" for="${checkboxId}" value="${item.title}">
                <i class="fa fa-trash" aria-hidden="true" onclick="deleteItemCallback(${index}, ${i})"></i>
            </p>
        `;
        checklistBody += itemBody;
    }

    // TODO delete checklist
    return `
    <div class="email-content">
        <div class="email-content-header pure-g">
            <div class="pure-u-1-2">
                <input type="text" class="editable-title somehow-big email-content-title" value="${checklist.title}">
            </div>

            <div class="email-content-controls pure-u-1-2">
                <button class="secondary-button pure-button" onclick="saveCallback(${index})">Save</button>
                <button class="secondary-button pure-button" onclick="addItemCallback(${index})">Add Item</button>
            </div>
        </div>

        <div class="email-content-body">
            ${checklistBody}
        </div>
    </div>`;
}

/**
 * Displays a checklist referenced by its index on the main content div
 * @param i the checklist reference index
 */
function displayChecklist(i) {
    document.getElementById('main').innerHTML = generateChecklistContent(loadChecklists(), i);
    document.getElementById('checklist-' + i).classList.add('active');
    // TODO set remaining lists as inactive
}

/**
 * Generates a checklist from the contents of the main div
 * @returns the checklist that is described on the main content
 */
function readChecklist() {
    var items = [];
    var checkboxes = document.getElementsByName('checkbox');

    for (var i = 0; i < checkboxes.length; i++) {
        var checkbox = checkboxes[i];
        var label = findLabelForCheckbox(checkbox.id);  // IDEA replace this by a map from checkboxes to labels
        items.push({
            'title': label.value,
            'done': checkbox.checked
        });
    }

    return {
        "title": document.getElementsByClassName('email-content-title')[0].value,
        "items": items
    };
}

/**
 * Searches for the label related to an element as referenced by its id
 * @param id the reference element id
 * @returns the label that is related to the reference element
 */
function findLabelForCheckbox(id) {
    var labels = document.getElementsByClassName('textboxLabel');
    var targetId = "label-" + id;
    for (var i = 0; i < labels.length; i++) {
        var label = labels[i];
        if (label.id === targetId) {
            return label;
        }
    }
    return null;
}

// #############
// # CALLBACKS #
// #############

/**
 * Reaction to clicking the "New List" button
 */
function newListCallback() {
    var checklists = loadChecklists();
    checklists.push(createDummyChecklist());
    saveChecklists(checklists);
    draw();
}

/**
 * Reaction to clicking "Save" on a list
 */
function saveCallback(index) {
    var checklists = loadChecklists();
    var checklist = readChecklist();
    checklists[index] = checklist;
    saveChecklists(checklists);
    draw();
}

/**
 * Reaction to clicking "Add Item" on a list
 */
function addItemCallback(index) {
    var checklists = loadChecklists();
    var checklist = readChecklist();
    checklist.items.push({
        "title": "New item",
        "done": false
    })
    checklists[index] = checklist;
    saveChecklists(checklists);
    displayChecklist(index);
}

/**
 * Reaction to clicking the trashbox icon on an item
 */
function deleteItemCallback(checklistIndex, itemIndex) {
    var checklists = loadChecklists();
    var checklist = readChecklist();
    var newItems = [];

    for (var i = 0; i < checklist.items.length; i++) {
        if (i !== itemIndex) {
            newItems.push(checklist.items[i]);
        }
    }

    checklist.items = newItems;
    checklists[checklistIndex] = checklist;
    saveChecklists(checklists);
    displayChecklist(checklistIndex);
}

// ##################
// # MAIN FUNCTIONS #
// ##################

/**
 * Call when the page is first loaded
 */
function setup() {
    var checklists = loadChecklists();
    if (checklists.length === 0) {
        checklists.push(createDummyChecklist());
        // TODO display empty page
    }
    saveChecklists(checklists);
}

/**
 * Draw contents on screen
 */
function draw() {
    var checklists = loadChecklists();
    var checklistsHTML = "";
    for (var i = 0; i < checklists.length; i++) {
        checklistsHTML += generateChecklistCard(checklists, i);
    }
    document.getElementById('list').innerHTML = checklistsHTML;
}
