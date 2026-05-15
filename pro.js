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
/* =========================
   CALCULATOR
========================= */

const calcDisplay =
document.getElementById("calc-display");

const calcButtons =
document.querySelectorAll(".calc-btn");

const calcEquals =
document.getElementById("calc-equals");

const calcClear =
document.getElementById("calc-clear");

/* Add Numbers */

calcButtons.forEach((button) => {

    button.addEventListener("click", () => {

        calcDisplay.value +=
        button.textContent;

    });

});

/* Calculate */

if (calcEquals) {

    calcEquals.addEventListener("click", () => {

        try {

            calcDisplay.value =
            eval(calcDisplay.value);

        } catch {

            calcDisplay.value = "Error";

        }

    });

}

/* Clear */

if (calcClear) {

    calcClear.addEventListener("click", () => {

        calcDisplay.value = "";

    });

}

/* =========================
   STOPWATCH
========================= */

let stopwatchInterval;

let seconds = 0;

const stopwatchDisplay =
document.getElementById(
    "stopwatch-display"
);

function updateStopwatch() {

    let hrs =
    Math.floor(seconds / 3600);

    let mins =
    Math.floor((seconds % 3600) / 60);

    let secs =
    seconds % 60;

    hrs = String(hrs).padStart(2, "0");
    mins = String(mins).padStart(2, "0");
    secs = String(secs).padStart(2, "0");

    stopwatchDisplay.textContent =
        `${hrs}:${mins}:${secs}`;
}

/* Start */

document.getElementById(
    "start-stopwatch"
).addEventListener("click", () => {

    clearInterval(stopwatchInterval);

    stopwatchInterval =
    setInterval(() => {

        seconds++;

        updateStopwatch();

    }, 1000);

});

/* Stop */

document.getElementById(
    "stop-stopwatch"
).addEventListener("click", () => {

    clearInterval(stopwatchInterval);

});

/* Reset */

document.getElementById(
    "reset-stopwatch"
).addEventListener("click", () => {

    clearInterval(stopwatchInterval);

    seconds = 0;

    updateStopwatch();

});

/* =========================
   QUOTE GENERATOR
========================= */

const quotes = [

    "Success starts with consistency.",

    "Push yourself every day.",

    "Dream big and work hard.",

    "Code. Learn. Build.",

    "Your future is built today."

];

const quoteText =
document.getElementById("quote-text");

document.getElementById(
    "new-quote-btn"
).addEventListener("click", () => {

    const randomIndex =
    Math.floor(Math.random() * quotes.length);

    quoteText.textContent =
    quotes[randomIndex];

});

/* =========================
   RANDOM BACKGROUND
========================= */

const backgrounds = [

    "#f4f4f4",

    "#dfe9f3",

    "#fceabb",

    "#d4fc79",

    "#c2e9fb"

];

document.getElementById(
    "change-bg-btn"
).addEventListener("click", () => {

    const randomBg =
    backgrounds[
        Math.floor(
            Math.random() *
            backgrounds.length
        )
    ];

    document.body.style.background =
    randomBg;

});

/* =========================
   KEYBOARD SHORTCUTS
========================= */

document.addEventListener(
    "keydown",
    (event) => {

        /* Press D for Dark Mode */

        if (
            event.key === "d"
        ) {

            document.body.classList.toggle(
                "dark-mode"
            );

        }

        /* Press B for Background */

        if (
            event.key === "b"
        ) {

            document.getElementById(
                "change-bg-btn"
            ).click();

        }

    }
);