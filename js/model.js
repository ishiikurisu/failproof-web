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
 *
 */
function createNote() {
    return null;
}
