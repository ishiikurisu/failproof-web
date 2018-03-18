// COOKIES

/**
 * Gets a cookie from the key value.
 */
function getCookie(key) {
    var cookies = document.cookie.split(';');
    var limit = cookies.length;
    var outlet = null;

    for (var i = 0; i < limit; i++) {
        var cookie = cookies[i].split('=');
        if (cookie[0] === key) {
            outlet = cookie[1];
        }
    }

    return outlet;
}

/**
 * Adds a cookies to the browser.
 */
function setCookie(key, value) {
    document.cookie = key + "=" + value + "; expires=25 Dec 2050; path=/";
}

// Checklists

/**
 * Adds a checklist to the cookies. In cookie mode, checklists are stored as
 * a '|' separated values list, and all lists are separated by ':' characters,
 * as in Linux path.
 */
function addChecklist(checklist) {
    var rawChecklists = getCookie('checklists');
    var cookie = "";

    checklist.replace('\n', '|');

    if (rawChecklists === null) {
        cookie = checklist;
    } else {
        cookie = ":" + checklist;
    }

    setCookie('checklists', cookie);
}

/**
 * Gets all checklists in an array.
 */
function getChecklists() {
    return getCookie('checklists').split(':')
                                  .map(function (it) {
                                      return it.replace('|', '\n');
                                  });
}

/**
 * TODO Implement a `removeChecklist` function.
 */
