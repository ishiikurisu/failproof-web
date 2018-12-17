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
                /* TODO draw already checked items */
                checklistHtml += `
                        <li class="list-group-item">
                            <p class="todo-task" 
                               onclick="cycleTask(`+i+`,`+j+`)"
                               id="taski`+i+`j`+j+`">
                            `+ checklist.items[j].title +`
                            </p>
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

function cycleTask(i, j) {
    var p = $("#taski"+i+"j"+j);
    if (p.hasClass('todo-task')) {
        p.removeClass('todo-task');
        p.addClass('done-task');
    } else if (p.hasClass('done-task')) {
        p.removeClass('done-task');
        p.addClass('todo-task');
    }
    /* TODO update model */
}

$(document).ready(function() {
    draw();
});
