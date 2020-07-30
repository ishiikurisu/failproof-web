/**
 * Includes a login button to the navigation bar
 */
function addLoginButton() {
    // <a class="primary-button pure-button" href="./login.html">Log In</a>
    var loginButton = document.createElement("a");
    
    loginButton.appendChild(document.createTextNode("Log In"));
    loginButton.classList.add("primary-button");
    loginButton.classList.add("pure-button");
    loginButton.href = "./login.html"
    
    document.getElementsByClassName("nav-inner")[0].appendChild(loginButton);
}

/**
 * Includes a login button to the navigation bar
 */
function addLogoutButton() {
    // <a class="primary-button pure-button" href="./login.html">Log In</a>
    var logoutButton = document.createElement("a");
    
    logoutButton.appendChild(document.createTextNode("Log Out"));
    logoutButton.classList.add("primary-button");
    logoutButton.classList.add("pure-button");
    logoutButton.addEventListener('click', function() {
       eraseCookie('auth_key');
        window.location.replace("./index.html");
    });
    
    document.getElementsByClassName("nav-inner")[0].appendChild(logoutButton);
}