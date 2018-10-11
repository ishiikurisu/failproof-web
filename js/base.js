function getChecklists() {
    return [ ];
}

$(document).ready(function() {
    var checklists = getChecklists();
    if (checklists.length === 0) {
        $('#content').html('<p>No checklists yet :(\nWhy don\'t you add add some?</p>');
    }
});
