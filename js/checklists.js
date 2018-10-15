function addChecklistWithIndex(index) {
    $.get("/stuff/examples.json", function(checklists) {
        addChecklist(checklists[index]);
        window.location = "/";
    });
}

function createCardForChecklist(index, checklists) {
    var checklist = checklists[index];
    var col = $("<div/>", { class: "col-md-4" });
    var card = $("<div/>", { class: "card mb-4" });
    var cardHead = $("<div/>", { class: "card-head" });
    var cardHeader = $("<h3/>", { text: checklist.title });
    var cardBody = $("<div/>", { class: "card-body" });
    var checklistItems = $("<ul/>");
    var addChecklistButton = $("<button/>", { 
        class: "btn btn-sm btn-outline-primary",
        type: "button",
        text: "Add me!",
        id: "button-add-" + index,
        onclick: "addChecklistWithIndex(" + index + ")"
    });

    for (var i = 0; i < checklist.items.length; i++) {
        $("<li/>", { html: checklist.items[i].title }).appendTo(checklistItems);
    }

    cardBody.append(checklistItems);
    cardBody.append(addChecklistButton);
    cardHead.append(cardHeader);
    card.append(cardHead);
    card.append(cardBody);
    col.append(card);

    return col;
}

$(document).ready(function() {
    // Drawing example checklists
    $.get("/stuff/examples.json", function(checklists) {
        var row = $("<div/>", { class: "row" });
        for (var i = 0; i < checklists.length; i++) {
            var checklist = checklists[i];
            var card = createCardForChecklist(i, checklists);
            var cardId = "#button-add-" + i;
            row.append(card);
        }
        $("#content").html(row);
    });
});
