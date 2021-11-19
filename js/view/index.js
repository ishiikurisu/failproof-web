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
    syncButton.innerHTML = `<i class="fa fa-clock-o" aria-hidden="true"></i>`;

    downloadNotes(function(result) {
        importNotes(JSON.parse(JSON.parse(result.response).notes));
        syncButton.innerHTML = `<i class="fa fa-refresh" aria-hidden="true"></i>`;
    });
}

function logoffCallback() {
    dropDb();
    window.location.href = `./index.html`;
}

function saveButtonClick() {
    window.location.href = `./backup.html`;
}

function setup() {
    // toolbar and database setup
    var header = document.getElementById("header");
    if (isUserLoggedIn()) {
        downloadNotes(function(result) {
            importNotes(JSON.parse(JSON.parse(result.response).notes));
        });

        document.getElementById("toolbar").innerHTML += `
            <button type="button" name="button" id="sync-button" onclick="syncCallback()">
                <i class="fa fa-refresh" aria-hidden="true"></i>
            </button>
        `;
        header.innerHTML += `<button type="button" name="button" onclick="logoffCallback()">
            <i class="fa fa-user-times" aria-hidden="true"></i>
        </button>`;

    } else {
        initDb();

        header.innerHTML += `
            <a class="button" href="./login.html">
                <i class="fa fa-user-circle-o" aria-hidden="true"></i>
            </a>
        `;
    }

    // content setup
    document.getElementById("content").innerHTML = generateNoteIdList();
    document.getElementById("new-note-button").addEventListener("click", newNoteButtonClick);
    document.getElementById("save-button").addEventListener("click", saveButtonClick);
    registerCycleThemeCallback();
    setExistingTheme();
}
