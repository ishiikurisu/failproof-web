function setup() {
    // redirect to login page if user is not logged in
    if (!isUserLoggedIn()) {
        location.href = "./login.html";
        return;
    }

    // setup password button
    document.getElementById("change-password-button").addEventListener("click", function(e) {
        const oldPassword = document.getElementById("old-password").value;
        const newPassword = document.getElementById("new-password").value;
        const newPasswordAgain = document.getElementById("new-password-again").value;

        if (newPassword !== newPasswordAgain) {
            alert("New passwords do not match!");
            return;
        }

        updatePassword(oldPassword, newPassword, function(result) {
            alert((!!result.error)? result.error : "Password updated!");
        });
    });

    // setup theme and theme radio buttons
    setExistingTheme();
    document.getElementById(`${getCurrentTheme()}-theme-radio`).checked = true;
    document.getElementById(`nord-theme-radio`).addEventListener("click", function(e) {
        setTheme("nord");
    });
    document.getElementById(`dark-theme-radio`).addEventListener("click", function(e) {
        setTheme("dark");
    });

    // setup logoff button
    document.getElementById("logoff-button").addEventListener("click", function(e) {
        dropDb();
        window.location.href = `./index.html`;
    });
}
