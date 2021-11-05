function setup() {
    var signupButton = document.getElementById("signup");
    signupButton.addEventListener("click", function() {
        var username = document.getElementById("username").value;
        var password = document.getElementById("password").value;
        var notes = JSON.stringify(exportNotes());
        signupButton.innerHTML = "Signing up";
        createUser(username, password, notes, function(result) {
            if (result.status === 200) {
                var response = JSON.parse(result.response);
                var auth_key = response.auth_key;
                if (!!auth_key) {
                    logIn(auth_key);
                    signupButton.innerHTML = "Redirecting to main page";
                    window.location.href = "./index.html";
                }
            }
            signupButton.innerHTML = "Try again";
        });
    });
}
