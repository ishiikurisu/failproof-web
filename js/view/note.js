function findGetParameter(parameterName) {
    var result = null,
        tmp = [];
    location.search
        .substr(1)
        .split("&")
        .forEach(function (item) {
          tmp = item.split("=");
          if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
        });
    return result;
}

function unescapeHTML(escapedHTML) {
    return escapedHTML.replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&amp;/g,'&');
}

function formatTable(table) {
    var outlet = "";
    var i;

    // identifying headers
    var headers = [];
    for (var key in table[0]) {
        headers.push(key);
    }

    // formating header
    outlet = "|";
    for (i = 0; i < headers.length; i++) {
        outlet += ` ${headers[i]} |`;
    }
    outlet += "\n|";
    for (i = 0; i < headers.length; i++) {
        outlet += `----|`;
    }
    outlet += "\n";

    // formatting rows
    for (i = 0; i < table.length; i++) {
        var row = table[i];

        outlet += "|";
        for (var key in row) {
            outlet += ` ${row[key]} |`;
        }
        outlet += "\n";
    }

    return outlet;
}

function isViewModeOn() {
    return document.getElementById("toggle-edit").innerHTML === "View";
}

/**
 * Generates a callback to the save button
 * @param noteId id from the note that will be edited
 * @returns a function that will get the required content and save it on the
 *          correct note
 */
function generateSaveCallback(noteId) {
    return function() {
        updateNote(noteId, {
            id: noteId,
            title: document.getElementById("title").innerHTML,
            kind: document.getElementById("kind").value,
            contents: (isViewModeOn())?
                document.getElementById("contents").value :
                getNote(noteId).contents
        });

        if (isUserLoggedIn()) {
            var saveButton = document.getElementById("save");
            saveButton.innerHTML = "Uploading...";
            uploadNotes(JSON.stringify(exportNotes()), function(result) {
                saveButton.innerHTML = "Save";
            });
        }
    }
}

/**
 * Generates a callback to the delete button
 * @param noteId id from the note that will be deleted
 * @returns a function that will remove the current note from storage
 */
function generateDeleteCallback(noteId) {
    return function() {
        deleteNote(noteId);

        if (isUserLoggedIn()) {
            uploadNotes(JSON.stringify(exportNotes()), function(result) {
                var response = JSON.parse(result.response);
                if (!!response.error) {
                    alert("Failed to delete note.");
                } else {
                    window.location.href = "./index.html";
                }
            });
        } else {
            window.location.href = "./index.html";
        }
    }
}

/**
 * Removes HTML markup from contents
 * @param contents raw contents
 * @returns clean contents text
 */
function cleanContents(contents) {
    return contents.replace(/\<div\>/g, "").replace(/\<br\/?\>|\<\/div\>/g, "\n");
}

/**
 * Generates a function that either renders markdown on contents div or allows
 * contents to be edited
 * @param noteId id from current note
 * @returns function to be called by toggle-edit button
 */
function generateToggleEditCallback(noteId) {
    return function() {
        var contentsText = null;
        var contents = null;
        var toggleEditButton = document.getElementById("toggle-edit");
        var kindSelect = document.getElementById("kind");
        var noteContents = document.getElementById("note-contents");

        if (isViewModeOn()) {
            contentsText = document.getElementById("contents");
            contents = contentsText.value;

            updateNote(noteId, {
                id: noteId,
                title: document.getElementById("title").innerHTML,
                kind: kindSelect.value,
                contents: contents
            });

            var outlet = cleanContents(contents);

            if (document.getElementById("kind").value === "table") {
                var xmdt = new ExtendedMarkdownTable();
                outlet = formatTable(xmdt.extend(unescapeHTML(outlet)));
            }

            var md = new remarkable.Remarkable();
            noteContents.innerHTML = md.render(outlet);
            toggleEditButton.innerHTML = "Edit";
            kindSelect.disabled = "true";
        } else {
            contentsText = document.createElement("textarea");
            contentsText.id = "contents";
            contentsText.value = getNote(noteId).contents;
            noteContents.innerHTML = "";
            noteContents.appendChild(contentsText);
            toggleEditButton.innerHTML = "View";
            kindSelect.disabled = null;
        }
    }
}

/**
 * MAIN FUNCTION
 */
function setup() {
    var noteId = findGetParameter("id");
    var note = getNote(noteId);

    document.getElementById("title").innerHTML = note.title;
    document.getElementById("contents").value = note.contents || "Get started!";
    document.getElementById("save").addEventListener("click", generateSaveCallback(noteId));
    document.getElementById("delete").addEventListener("click", generateDeleteCallback(noteId));
    document.getElementById("kind").value = note.kind;
    document.getElementById("toggle-edit").addEventListener("click", generateToggleEditCallback(noteId));
}
