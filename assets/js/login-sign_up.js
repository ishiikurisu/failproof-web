// ######################
// # CALLBACK FUNCTIONS #
// ######################

/**
 * gets values from credentials form
 */
function readCredentials() {
    return {
        username: document.getElementById("stacked-username").value,
        password: document.getElementById("stacked-password").value
    }
}

/**
 * Atempts to login
 */
function login() {
    // TODO tell user app is trying to login 
    // authenticating
    var credentials = readCredentials();
    authenticateUser(credentials, function(result) {
        if (result === null || result.auth_key === null) {
            alert("Oops :(");
        } else {
            saveChecklists(fpclToChecklists(result.notes));
            setCookie("auth_key", result.auth_key);
            window.location.replace("./index.html");
        }
    });
}

/**
 * Atempts to sign up
 */
function sign_up() {
    // TODO tell user app is trying to sign up
    var credentials = readCredentials();
    var notes = checklistsToFpcl(JSON.parse(getCookie("checklists")));
    var payload = {
        ...credentials,
        notes: notes
    }
    
    signUpUser(payload, function(result) {
        console.log(result);
        if (result === null || result.auth_key === null) {
            alert("Oops :(");
        } else {
            setCookie("auth_key", result.auth_key);
            window.location.replace("./index.html");
        }
    });
}

// ##################
// # MAIN FUNCTIONS #
// ##################

/**
 * Called when first entering page
 */
function setup() {
    
}

/**
 * Called when first entering page
 */
function draw() {
    
}