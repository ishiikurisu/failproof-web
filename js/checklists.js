$(document).ready(function() {
    // Drawing example checklists
    $.get("/stuff/examples.json", function(checklists) {
        for (var i = 0; i < checklists.length; i++) {
            var checklist = checklists[i];
            // TODO Add checklist to page
        }
    });
});
