// Auxiliar function
function drawChecklists(checklists) {
    var content = document.getElementById("content");
    var outlet = `
        <p>No checklists yet! Why don't you add some?</p>
    `;

    if (checklists !== null) {
        // TODO Draw checklist previews on screen.
    }

    content.innerHTML = outlet;
}
