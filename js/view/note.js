/**
 * Gets a GET parameter from the URL
 * @param parameterName the parameter key
 * @returns the associated value, or null if no key is assigned to that parameter
 */
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
 * Tells if the view mode is on by verifying the current state of the UI
 * @returns true if the view mode is on, false otherwise
 */
function isViewModeOn() {
    return document.getElementById("toggle-edit").innerHTML.includes("eye");
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
            saveButton.innerHTML = `<i class="fa fa-clock-o" aria-hidden="true"></i>`;
            uploadNotes(JSON.stringify(exportNotes()), function(result) {
                saveButton.innerHTML = `<i class="fa fa-floppy-o" aria-hidden="true"></i>`;
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

            noteContents.innerHTML = pipe(contents, [
                cleanContents,
                getViewFunction(document.getElementById("kind").value)
            ]);
            toggleEditButton.innerHTML = `<i class="fa fa-pencil" aria-hidden="true"></i>`;
            kindSelect.disabled = "true";
        } else {
            contentsText = document.createElement("textarea");
            contentsText.id = "contents";
            contentsText.value = getNote(noteId).contents;
            noteContents.innerHTML = "";
            noteContents.appendChild(contentsText);
            toggleEditButton.innerHTML = `<i class="fa fa-eye" aria-hidden="true"></i>`;
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

    if (isUserLoggedIn()) {
        document.getElementById("profile-link").setAttribute("href", "./profile.html");
    }

    setExistingTheme();
}
