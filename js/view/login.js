function setup() {
    var loginButton = document.getElementById("login");
    loginButton.addEventListener("click", function() {
        var username = document.getElementById("username").value;
        var password = document.getElementById("password").value;
        auth(username, password, function(result) {
            if (result.status === 200) {
                var response = JSON.parse(result.response);
                if (!!response.auth_key) {
                    if (!!response.notes) {
                        var notes = JSON.parse(response.notes);
                        importNotes(notes);
                    }
                    logIn(response.auth_key);
                    loginButton.innerHTML = "Redirecting to main page";
                    window.location.href = "./index.html";
                    return;
                }
            }
            loginButton.innerHTML = "Try again";
        });
    });
}
