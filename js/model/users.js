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
    request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
    request.onload = function() {
        callback(this);
    };
    request.onerror = function() {
        alert("Oops");
    };
    request.send(JSON.stringify(data));
}
