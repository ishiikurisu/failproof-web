/**
 * Starts the local storage if required
 */
function initDb() {
    var archiveIndex = localStorage.getItem("index");
    if (!archiveIndex) {
        localStorage.setItem("index", "[]");
    }
}

/**
 * Deletes current database
 */
function dropDb() {
    localStorage.clear();
}

/**
 * Creates UUID identifier
 */
function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

/**
 * generates a local storage key for a note id
 */
function noteIdKey(noteId) {
    return `note-${noteId}`;
}

/**
 * Lists all notes
 */
function getNotes() {
    return JSON.parse(localStorage.getItem("index"));
}

/**
 * Creates a new empty note in the archive index
 * @returns the new note id
 */
function createNote() {
    var noteId = uuidv4();
    var note = {
        id: noteId,
        title: "New note",
        kind: "md",
        contents: ""
    };

    var archiveIndex = getNotes();
    archiveIndex.push(noteId);
    localStorage.setItem("index", JSON.stringify(archiveIndex));
    localStorage.setItem(noteIdKey(noteId), JSON.stringify(note));

    return noteId;
}

/**
 * Gets a note
 * @param noteId the note id
 * @returns null if there isn't a note with this id; or a note object
 */
function getNote(noteId) {
    return JSON.parse(localStorage.getItem(noteIdKey(noteId)));
}

/**
 * Updates a note on the database
 * @param noteId note id
 * @param newNote the new note to be saved
 */
function updateNote(noteId, newNote) {
    var oldNote = getNote(noteId);
    localStorage.setItem(noteIdKey(noteId), JSON.stringify({
        id: noteId,
        kind: oldNote.kind,
        title: newNote.title || oldNote.title,
        contents: newNote.contents
    }));
}

/**
 * Removes a note from the database
 * @param noteId note id
 */
function deleteNote(noteId) {
    var oldArchiveIndex = getNotes();
    var archiveIndex = [];

    for (var i = 0; i < oldArchiveIndex.length; i++) {
        var id = oldArchiveIndex[i];
        if (noteId !== id) {
            archiveIndex.push(id);
        }
    }

    localStorage.setItem("index", JSON.stringify(archiveIndex));
    localStorage.removeItem(noteIdKey(noteId));
}
