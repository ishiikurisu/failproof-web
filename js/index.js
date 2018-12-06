function addEmptyChecklist() {
    addChecklist(checklistToString(getEmptyChecklist()));
    draw();
}

function draw() {
    var checklists = getChecklists();
    var html = $(`
        <p>
            No checklists yet :(
        </p>
    `);
    
    if (checklists.length > 0) {
        var cardColumns = $('<div/>', {class: 'card-columns'});
        for (var i = 0; i < checklists.length; i++) {
            var checklist = stringToChecklist(checklists[i]);
            var checklistHtml = `
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">`+ checklist.title +`</h5>
                    </div>
                    <ul class="list-group list-group-flush">
            `;
            for (var j = 0; j < checklist.items.length; j++) {
                /* TODO make items checkable */
                /* TODO enable editon of items' titles */
                /* TODO enable remotion of items */
                checklistHtml += `
                            <li class="list-group-item">
                                `+ checklist.items[j].title +`
                            </li>
                `;
            }
            /* TODO enable addition of items */
            checklistHtml += `
                    </ul>
                </div>
            `;
            var card = $(checklistHtml);
            cardColumns.append(card);
        }

        html = cardColumns;
    }

    $('#content').html(html);
}

$(document).ready(function() {
    draw();
});
