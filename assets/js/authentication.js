/**
 * Checks if a user is logged in the application or not
 */
function isUserAuthenticated() {
    return !!getCookie("auth_key");
}

/**
 * Tries to authenticate an user
 * @param credentials object with `username` and `password` fields
 * @param callback function with resulting object as specified by the API
 */
function authenticateUser(credentials, callback) {
    var request = new XMLHttpRequest();
    request.open('POST', 'https://fpcl.herokuapp.com/users/auth', true);
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    request.onload = function() {
        callback((this.status >= 200 && this.status < 400)? JSON.parse(this.response) : null);
    }
    request.send(JSON.stringify(credentials));
}

/**
 * Tries to create an user
 * @param payload object with `username`, `password`, and `notes` fields
 * @param callback function with resulting object as specified by the API
 */
function signUpUser(payload, callback) {
    var request = new XMLHttpRequest();
    request.open('POST', 'https://fpcl.herokuapp.com/users/create', true);
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    request.onload = function() {
        callback((this.status >= 200 && this.status < 400)? JSON.parse(this.response) : null);
    }
    request.send(JSON.stringify(payload));
}

/**
 * If the user is logged in, stores his notes in the cloud
 */
function maybeCloudSaveChecklists(notes, callback) {
    var auth_key = getCookie("auth_key");
    
    if (!!auth_key) {
        var request = new XMLHttpRequest();
        request.open('POST', `https://fpcl.herokuapp.com/notes`, true);
        request.onload = function() {
            var payload = {
                error: "Internal Server error"
            }; 
            if (this.status >= 200 && this.status < 400) {
                var response = JSON.parse(this.response);
                payload = response;
            }
            callback(payload);
        }
        request.send(JSON.stringify({
            auth_key: auth_key,
            notes: notes
        }));
    } else {
        callback({
            warning: "User not logged in"
        });
    }
}

/**
 * If the user is logged in, gets the most up to date version of the checklist
 * @param callback function to be called after the checklists are in sync on memory
 */
function maybeSync(callback) {
    var auth_key = getCookie("auth_key");
    
    if (!!auth_key) {
        var request = new XMLHttpRequest();
        
        request.open('POST', `https://fpcl.herokuapp.com/sync`, true);
        request.onload = function() {
            if (this.status >= 200 && this.status < 400) {
                var response = JSON.parse(this.response);
                saveChecklists(fpclToChecklists(response.notes));
            }
            callback();
        }
        request.send(JSON.stringify({
            auth_key: auth_key,
            notes: checklistsToFpcl(loadChecklists()),
            last_updated: getCookie('last_updated')
        }));
    } else {
        callback();
    }
}