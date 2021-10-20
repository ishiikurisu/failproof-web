function setup() {
    var loginButton = document.getElementById("login");
    loginButton.addEventListener("click", function() {
        var username = document.getElementById("username").value;
        var password = document.getElementById("password").value;
        var notes = JSON.stringify(exportNotes());
        createUser(username, password, notes, function(result) {
            if (result.status === 200) {
                var response = JSON.parse(result.response);
                var auth_key = response.auth_key;
                if (!!auth_key) {
                    logIn(auth_key);
                    loginButton.innerHTML = "Redirecting to main page";
                    window.location.href = "./index.html";
                }
            }
            loginButton.innerHTML = "Try again";
        });
    });
}
