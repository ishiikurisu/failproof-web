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
}
