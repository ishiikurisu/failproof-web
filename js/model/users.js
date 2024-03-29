const FPCL_API_URL = "https://fpcl.herokuapp.com"

/**
 * Logs the user off
 */
function logOff() {
    localStorage.removeItem("auth_key");
}

/**
 * Stores auth key on local database
 * @param auth_key key from database
 */
function logIn(auth_key) {
    localStorage.setItem("auth_key", auth_key);
}

/**
 * @returns true if the user is logged in, false otherwise
 */
function isUserLoggedIn() {
    return !!localStorage.getItem("auth_key");
}

/**
 * Atempts to log the user in
 * @param username username
 * @param password password
 * @param callback function dealing with the result of the request
 */
function auth(username, password, callback) {
    var data = {
        username: username,
        password: password
    };
    var request = new XMLHttpRequest();
    request.open("POST", `${FPCL_API_URL}/users/auth`, true);
    request.setRequestHeader("Content-Type", "application/json");
    request.onload = function() {
        callback(this);
    };
    request.onerror = function() {
        callback(this);
    };
    request.send(JSON.stringify(data));
}

/**
 * Atempts to create a new user
 * @param username username
 * @param password password
 * @param notes existing notes in backup form
 * @param callback function dealing with the result of the request
 */
function createUser(username, password, notes, callback) {
    var data = {
        username: username,
        password: password,
        notes: notes
    };
    var request = new XMLHttpRequest();
    request.open("POST", `${FPCL_API_URL}/users/create`, true);
    request.setRequestHeader("Content-Type", "application/json");
    request.onload = function() {
        callback(this);
    };
    request.onerror = function() {
        alert("Oops");
    };
    request.send(JSON.stringify(data));
}

/**
 * Downloads notes from database
 * @param callback in backup format
 */
function downloadNotes(callback) {
    var auth_key = localStorage.getItem("auth_key");
    var request = new XMLHttpRequest();
    request.open("GET", `${FPCL_API_URL}/notes?auth_key=${auth_key}`, true);
    request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
    request.onload = function() {
        callback(this);
    };
    request.onerror = function() {
        alert("Oops");
    };
    request.send();
}

/**
 * Upload notes to database
 * @param notes notes in backup format
 * @callback callback result from database call
 */
function uploadNotes(notes, callback) {
    var request = new XMLHttpRequest();
    var data = {
        auth_key: localStorage.getItem("auth_key"),
        notes: notes
    };

    request.open("POST", `${FPCL_API_URL}/notes`, true);
    request.setRequestHeader("Content-Type", "application/json");
    request.onload = function() {
        callback(this);
    };
    request.onerror = function() {
        alert("Oops");
    };

    request.send(JSON.stringify(data));
}

/**
 * Uses the current auth key to update the user's password
 * @param oldPassword the old password
 * @param newPassoword the old password
 * @param callback function to be called with the result of the operation
 */
function updatePassword(oldPassword, newPassword, callback) {
    var request = new XMLHttpRequest();
    var data = {
        "auth_key": localStorage.getItem("auth_key"),
        "old_password": oldPassword,
        "new_password": newPassword
    };

    request.open("POST", `${FPCL_API_URL}/users/password`, true);
    request.setRequestHeader("Content-Type", "application/json");
    request.onload = function() {
        callback(JSON.parse(this.response));
    };
    request.onerror = function() {
        callback({error: "Request failed :("})
    };

    request.send(JSON.stringify(data));
}
