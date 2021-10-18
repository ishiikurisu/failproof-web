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

function setup() {
    var noteId = findGetParameter("id");
    var note = getNote(noteId);

    document.getElementById("title").innerHTML = note.title;
    document.getElementById("contents").innerHTML = note.contents || "Get started!";
}
