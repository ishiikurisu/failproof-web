const STYLESHEET_BY_THEME = {
    "nord": "./css/mini-nord.css",
    "dark": "./css/mini-dark.min.css"
}

const THEME_CYCLE = {
    "nord": "dark",
    "dark": "nord"
}

// ################
// # COOKIE LOGIC #
// ################

/**
 * sets cookie
 * @param name cookie key
 * @param value cookie value
 * @param days cookie expiration time
 */
function setCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

/**
 * gets cookie
 * @param name cookie key
 * @returns cookie value
 */
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

/**
 * deletes cookie
 * @param name cookie key
 */
function eraseCookie(name) {
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

// ####################
// # THEME MANAGEMENT #
// ####################

/**
 * swaps style sheet
 * @param sheet href to new CSS file
 */
function swapStyleSheet(sheet) {
    document.getElementById("pagestyle").setAttribute("href", sheet);
}

/**
 * Gets current theme
 * @returns the current theme or "dark" if no theme has been selected so far
 */
function getCurrentTheme() {
    return getCookie("theme") || "dark";
}

/**
 * Sets current theme
 */
function setTheme(theme) {
    swapStyleSheet(STYLESHEET_BY_THEME[theme]);
    setCookie("theme", theme, 60);
}

/**
 * cycles stylesheets depending on current theme
 */
function toggleTheme() {
    const theme = THEME_CYCLE[getCurrentTheme()];
    setTheme(theme);
}

/**
 * sets theme depending on memory contents
 */
function setExistingTheme() {
    swapStyleSheet(STYLESHEET_BY_THEME[getCurrentTheme()]);
}

/**
 * registers callback to cycle theme button
 */
function registerCycleThemeCallback() {
    document.getElementById("cycle-theme").addEventListener("click", toggleTheme);
}
