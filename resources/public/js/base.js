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
