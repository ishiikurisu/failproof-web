function generateNoteIdList() {
    var noteIndex = getNotes();
    var outlet = `
        <p>
            Start by creating a new note
        </p>
    `;

    if (noteIndex.length > 0) {
        outlet = `<ul>`;
        for (var i = 0; i < noteIndex.length; i++) {
            var noteId = noteIndex[i];
            var note = getNote(noteId);
            outlet += `
                <li>
                    <a href="note.html?id=${noteId}">${note.title}</a>
                </li>
            `;
        }
        outlet += `</ul>`;
    }

    return outlet;
}

function newNoteButtonClick() {
    var id = createNote();
    window.location.href = `./note.html?id=${id}`;
}

function syncCallback() {
    var syncButton = document.getElementById("sync-button");
    syncButton.innerHTML = "Syncing...";

    downloadNotes(function(result) {
        importNotes(JSON.parse(JSON.parse(result.response).notes));
        syncButton.innerHTML = "Sync";
    });
}

function logoffCallback() {
    dropDb();
    window.location.href = `./index.html`;
}

function setup() {
    // header and database setup
    if (isUserLoggedIn()) {
        downloadNotes(function(result) {
            importNotes(JSON.parse(JSON.parse(result.response).notes));
        });

        document.getElementById("header").innerHTML += `
            <button type="button" name="button" id="sync-button" onclick="syncCallback()">Sync</button>
            <button type="button" name="button" onclick="logoffCallback()">Log Off</button>
        `;

    } else {
        initDb();

        document.getElementById("header").innerHTML += `
            <a href="./login.html">
                <button type="button" name="button">Login</button>
            </a>
        `;
    }

    // content setup
    document.getElementById("content").innerHTML = generateNoteIdList();
    document.getElementById("new-note-button").addEventListener("click", newNoteButtonClick);
}
