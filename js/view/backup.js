function saveCallback() {
    var rawBackup = document.getElementById("contents").innerHTML;
    var backup = JSON.parse(rawBackup);
    importNotes(backup);

    window.location.href = "./index.html";
}

function setup() {
    document.getElementById("contents").innerHTML = JSON.stringify(exportNotes());
    document.getElementById("save").addEventListener("click", saveCallback);
}
