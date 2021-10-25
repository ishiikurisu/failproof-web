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
            contents: document.getElementById("contents").innerHTML
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
        var contentsDiv = document.getElementById("contents");
        var toggleEditButton = document.getElementById("toggle-edit");

        if (contentsDiv.contentEditable === "true") {
            var contents = contentsDiv.innerHTML;

            updateNote(noteId, {
                id: noteId,
                title: document.getElementById("title").innerHTML,
                contents: contents
            });

            // XXX what about the save button?
            var md = new Remarkable();
            contentsDiv.innerHTML = md.render(cleanContents(contents));
            toggleEditButton.innerHTML = "Edit";
            contentsDiv.contentEditable = "false";
        } else {
            contentsDiv.innerHTML = getNote(noteId).contents;
            toggleEditButton.innerHTML = "View";
            contentsDiv.contentEditable = "true";
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
    document.getElementById("contents").innerHTML = note.contents || "Get started!";
    document.getElementById("save").addEventListener("click", generateSaveCallback(noteId));
    document.getElementById("delete").addEventListener("click", generateDeleteCallback(noteId));
    document.getElementById("toggle-edit").addEventListener("click", generateToggleEditCallback(noteId));
}
