// #############
// # CALLBACKS #
// #############

/**
 * Reaction to clicking "Save"
 */
function saveCallback() {
    var textarea = document.getElementById('checklistform');
    var rawChecklists = textarea.value;
    var checklists = fpclToChecklists(rawChecklists);
    saveChecklists(checklists);
    console.log(rawChecklists);
    maybeCloudSaveChecklists(rawChecklists);
    window.location = "./";
}

/**
 * Reaction to clicking "Menu". Should appear on mobile only.
 */
function navMenuButtonCallback() {
    var nav = document.getElementById('nav');
    nav.classList.toggle('active');
}


// ##################
// # MAIN FUNCTIONS #
// ##################

/**
 * Called when first entering the page
 */
function setup() {
    // navbar setup
    if (isUserAuthenticated()) {
        addLogoutButton();
    } else {
        addLoginButton();
    }
    
    // content setup
    var textarea = document.getElementById('checklistform');
    var checklists = loadChecklists(checklists);
    textarea.value = checklistsToFpcl(checklists);
}

/**
 * General draw function
 */
function draw() {

}
