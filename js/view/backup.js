function saveCallback() {
    var ok = true;
    var rawBackup = document.getElementById("contents").value;
    var backup = JSON.parse(rawBackup);
    importNotes(backup);

    if (isUserLoggedIn()) {
        uploadNotes(JSON.stringify(exportNotes()), function(result) {
            console.log(result);
            window.location.href = "./index.html";
        });
    }

    // window.location.href = "./index.html";
}

function setup() {
    document.getElementById("contents").innerHTML = JSON.stringify(exportNotes());
    document.getElementById("save").addEventListener("click", saveCallback);
}
