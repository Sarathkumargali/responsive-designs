/* =========================
   NOTES SAVE
========================= */

const notesArea =
document.getElementById("notes-area");

const saveNoteBtn =
document.getElementById("save-note-btn");

/* Load Notes */

window.addEventListener("DOMContentLoaded", () => {

    const savedNotes =
    localStorage.getItem("notes");

    if (savedNotes) {

        notesArea.value = savedNotes;

    }
});

/* Save Notes */

saveNoteBtn.addEventListener("click", () => {

    localStorage.setItem(
        "notes",
        notesArea.value
    );

    alert("Notes Saved!");

});

/* =========================
   THEME SWITCHER
========================= */

const blueTheme =
document.querySelector(".blue-theme");

const greenTheme =
document.querySelector(".green-theme");

const purpleTheme =
document.querySelector(".purple-theme");

blueTheme.addEventListener("click", () => {

    document.body.classList.remove(
        "green-mode",
        "purple-mode"
    );

});

greenTheme.addEventListener("click", () => {

    document.body.classList.remove(
        "purple-mode"
    );

    document.body.classList.add(
        "green-mode"
    );

});

purpleTheme.addEventListener("click", () => {

    document.body.classList.remove(
        "green-mode"
    );

    document.body.classList.add(
        "purple-mode"
    );

});

/* =========================
   FAKE WEATHER UPDATE
========================= */

const weatherTemp =
document.getElementById("weather-temp");

setInterval(() => {

    const randomTemp =
    Math.floor(Math.random() * 10) + 28;

    weatherTemp.textContent =
        `${randomTemp}°C`;

}, 5000);
/* =========================
   LOGIN SYSTEM
========================= */

const loginBtn =
document.getElementById("login-btn");

const registerBtn =
document.getElementById("register-btn");

const logoutBtn =
document.getElementById("logout-btn");

const welcomeUser =
document.getElementById("welcome-user");

/* =========================
   REGISTER USER
========================= */

if (registerBtn) {

    registerBtn.addEventListener("click", () => {

        const name =
        document.getElementById(
            "register-name"
        ).value;

        const email =
        document.getElementById(
            "register-email"
        ).value;

        const password =
        document.getElementById(
            "register-password"
        ).value;

        if (
            name === "" ||
            email === "" ||
            password === ""
        ) {

            alert("Please fill all fields");

            return;
        }

        const user = {
            name,
            email,
            password
        };

        localStorage.setItem(
            "user",
            JSON.stringify(user)
        );

        alert("Registration Successful!");

    });

}

/* =========================
   LOGIN USER
========================= */

if (loginBtn) {

    loginBtn.addEventListener("click", () => {

        const email =
        document.getElementById(
            "login-email"
        ).value;

        const password =
        document.getElementById(
            "login-password"
        ).value;

        const storedUser =
        JSON.parse(
            localStorage.getItem("user")
        );

        if (
            storedUser &&
            email === storedUser.email &&
            password === storedUser.password
        ) {

            sessionStorage.setItem(
                "loggedIn",
                "true"
            );

            sessionStorage.setItem(
                "username",
                storedUser.name
            );

            updateWelcomeUser();

            alert("Login Successful!");

        } else {

            alert("Invalid Email or Password");

        }

    });

}

/* =========================
   UPDATE USER INFO
========================= */

function updateWelcomeUser() {

    const username =
    sessionStorage.getItem("username");

    if (username && welcomeUser) {

        welcomeUser.textContent =
            `Welcome ${username}`;

    }

}

updateWelcomeUser();

/* =========================
   LOGOUT
========================= */

if (logoutBtn) {

    logoutBtn.addEventListener("click", () => {

        sessionStorage.clear();

        welcomeUser.textContent =
            "Welcome Guest";

        alert("Logged Out!");

    });

}

/* =========================
   SHOW/HIDE PASSWORD
========================= */

const togglePasswordBtn =
document.getElementById(
    "toggle-password-btn"
);

const loginPassword =
document.getElementById(
    "login-password"
);

if (
    togglePasswordBtn &&
    loginPassword
) {

    togglePasswordBtn.addEventListener(
        "click",
        () => {

            if (
                loginPassword.type ===
                "password"
            ) {

                loginPassword.type = "text";

                togglePasswordBtn.textContent =
                    "Hide Password";

            } else {

                loginPassword.type =
                    "password";

                togglePasswordBtn.textContent =
                    "Show Password";

            }

        }
    );

}