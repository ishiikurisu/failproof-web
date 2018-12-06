function addChecklistWithIndex(index) {
    $.get("/stuff/examples.json", function(checklists) {
        var checklist = checklists[index];
        addChecklist(checklist);
        console.log(checklist);
        window.location = "/";
    });
}

function createCardForChecklist(index, checklists) {
    var checklist = checklists[index];
    var card = $("<div/>", { class: "card" });
    var cardBody = $("<div/>", { class: "card-body" });
    var cardHeader = $("<h5/>", { class: "card-title", text: checklist.title });
    var checklistItems = $("<ul/>", { class: "list-group list-group-flush" });
    var addChecklistButton = $("<button/>", { 
        class: "btn btn-sm btn-outline-primary",
        type: "button",
        text: "Add me!",
        id: "button-add-" + index,
        onclick: "addChecklistWithIndex(" + index + ")"
    });

    for (var i = 0; i < checklist.items.length; i++) {
        $("<li/>", { 
            class: "list-group-item",
            html: checklist.items[i].title 
        }).appendTo(checklistItems);
    }

    cardBody.append(cardHeader);
    card.append(cardBody);
    card.append(checklistItems);
    card.append(addChecklistButton);
    return card;
}

$(document).ready(function() {
    // Drawing example checklists
    $.get("/stuff/examples.json", function(checklists) {
        var row = $("<div/>", { class: "row" });
        for (var i = 0; i < checklists.length; i++) {
            var card = createCardForChecklist(i, checklists);
            row.append(card);
        }
        $("#content").html(row);
    });
});
