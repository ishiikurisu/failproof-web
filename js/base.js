function addEmptyChecklist() {
    addChecklist(checklistToString(getEmptyChecklist()));
    draw();
}

function draw() {
    var checklists = getChecklists();
    var html = `
        <p>
            No checklists yet :(
            Why don't you 
            <a href="#" onclick="addEmptyChecklist()">
                add
            </a> 
            one?
        </p>
    `;
    
    if (checklists.length > 0) {
        var html = "";
        for (var i = 0; i < checklists.length; i++) {
            var checklist = stringToChecklist(checklists[i]);
            var checklistHtml = `
                <h5>`+ checklist.title +`</h5>
                <ul>
            `;
            for (var j = 0; j < checklist.items.length; j++) {
                /* TODO make items checkable */
                /* TODO enable editon of items' titles */
                /* TODO enable remotion of items */
                checklistHtml += `
                    <li>
                        `+ checklist.items[j].title +`
                    </li>
                `;
            }
            /* TODO enable addition of items */
            checklistHtml += '</ul>';

            html += checklistHtml;
        }
        html += `
            <a href="#" onclick="addEmptyChecklist()">Add another checklist</a>
        `;
    }

    $('#content').html($(html));
}

$(document).ready(function() {
    draw();
});
