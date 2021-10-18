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
        outlet += `</ul>`
    }

    return outlet;
}

function newNoteButtonClick() {
    var id = createNote();
    window.location.href = `./note.html?id=${id}`
}

function setup() {
    initDb();

    // note list setup
    var content = document.getElementById("content");
    content.innerHTML = generateNoteIdList();

    // new button setup
    var newNoteButton = document.getElementById("new-note-button");
    newNoteButton.addEventListener("click", newNoteButtonClick);
}
