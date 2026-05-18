/* =========================
   CLOCK
========================= */

function updateClock() {

    const now = new Date();

    let hours =
    String(now.getHours()).padStart(2, "0");

    let minutes =
    String(now.getMinutes()).padStart(2, "0");

    let seconds =
    String(now.getSeconds()).padStart(2, "0");

    document.getElementById("clock").textContent =
        `${hours}:${minutes}:${seconds}`;
}

setInterval(updateClock, 1000);

updateClock();

/* =========================
   DARK MODE
========================= */

const darkModeBtn =
document.getElementById("dark-mode-btn");

darkModeBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark-mode");

});

/* =========================
   PAGE NAVIGATION
========================= */

const navLinks =
document.querySelectorAll(".nav-link");

const pages =
document.querySelectorAll(".dashboard-page");

navLinks.forEach((link) => {

    link.addEventListener("click", (e) => {

        e.preventDefault();

        /* Remove Active Link */

        navLinks.forEach((nav) => {

            nav.classList.remove("active");

        });

        /* Add Active Link */

        link.classList.add("active");

        /* Hide Pages */

        pages.forEach((page) => {

            page.classList.remove("active-page");

        });

        /* Show Selected Page */

        const pageId =
        link.getAttribute("data-page");

        document.getElementById(pageId)
        .classList.add("active-page");

    });

});

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

/* Register */

registerBtn.addEventListener("click", () => {

    const name =
    document.getElementById("register-name").value;

    const email =
    document.getElementById("register-email").value;

    const password =
    document.getElementById("register-password").value;

    if (name === "" ||
        email === "" ||
        password === "") {

        alert("Please fill all fields");

        return;
    }

    const user = {

        name,
        email,
        password

    };

    localStorage.setItem(
        "dashboardUser",
        JSON.stringify(user)
    );

    alert("Registration Successful");

});

/* Login */

loginBtn.addEventListener("click", () => {

    const email =
    document.getElementById("login-email").value;

    const password =
    document.getElementById("login-password").value;

    const storedUser =
    JSON.parse(
        localStorage.getItem("dashboardUser")
    );

    if (
        storedUser &&
        email === storedUser.email &&
        password === storedUser.password
    ) {

        welcomeUser.textContent =
        `Welcome ${storedUser.name}`;

        alert("Login Successful");

    } else {

        alert("Invalid Email or Password");

    }

});

/* Logout */

logoutBtn.addEventListener("click", () => {

    welcomeUser.textContent =
    "Welcome Guest";

    alert("Logged Out");

});

/* =========================
   SHOW PASSWORD
========================= */

const togglePasswordBtn =
document.getElementById(
    "toggle-password-btn"
);

togglePasswordBtn.addEventListener(
    "click",
    () => {

        const passwordInput =
        document.getElementById(
            "login-password"
        );

        if (
            passwordInput.type === "password"
        ) {

            passwordInput.type = "text";

            togglePasswordBtn.textContent =
            "Hide Password";

        } else {

            passwordInput.type = "password";

            togglePasswordBtn.textContent =
            "Show Password";

        }

    }
);

/* =========================
   NOTES APP
========================= */

const notesArea =
document.getElementById("notes-area");

const saveNoteBtn =
document.getElementById("save-note-btn");

/* Load Notes */

window.addEventListener("load", () => {

    const savedNotes =
    localStorage.getItem("dashboardNotes");

    if (savedNotes) {

        notesArea.value = savedNotes;

    }

});

/* Save Notes */

saveNoteBtn.addEventListener("click", () => {

    localStorage.setItem(
        "dashboardNotes",
        notesArea.value
    );

    alert("Notes Saved");

});

/* =========================
   STOPWATCH
========================= */

let stopwatchInterval;

let seconds = 0;

let minutes = 0;

let hours = 0;

const stopwatchDisplay =
document.getElementById(
    "stopwatch-display"
);

function updateStopwatch() {

    seconds++;

    if (seconds === 60) {

        seconds = 0;

        minutes++;

    }

    if (minutes === 60) {

        minutes = 0;

        hours++;

    }

    stopwatchDisplay.textContent =
    `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

/* Start */

document.getElementById(
    "start-stopwatch"
).addEventListener("click", () => {

    clearInterval(stopwatchInterval);

    stopwatchInterval =
    setInterval(updateStopwatch, 1000);

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
    minutes = 0;
    hours = 0;

    stopwatchDisplay.textContent =
    "00:00:00";

});

/* =========================
   QUOTES
========================= */

const quotes = [

    "Success starts with consistency.",

    "Never stop learning.",

    "Dream big and work hard.",

    "Your future depends on today.",

    "Code. Learn. Build."

];

const quoteText =
document.getElementById("quote-text");

const newQuoteBtn =
document.getElementById("new-quote-btn");

if (newQuoteBtn) {

    newQuoteBtn.addEventListener(
        "click",
        () => {

            const randomIndex =
            Math.floor(
                Math.random() * quotes.length
            );

            quoteText.textContent =
            quotes[randomIndex];

        }
    );

}

/* =========================
   BACKGROUND CHANGER
========================= */

const bgButton =
document.getElementById("change-bg-btn");

const backgrounds = [

    "#f4f4f4",

    "#dbeafe",

    "#dcfce7",

    "#fae8ff",

    "#ffe4e6"

];

if (bgButton) {

    bgButton.addEventListener(
        "click",
        () => {

            const randomColor =
            backgrounds[
                Math.floor(
                    Math.random() *
                    backgrounds.length
                )
            ];

            document.body.style.backgroundColor =
            randomColor;

        }
    );

}

/* =========================
   SEARCH FUNCTION
========================= */

const searchInput =
document.querySelector(".search-input");

const boxes =
document.querySelectorAll(".box");

searchInput.addEventListener("keyup", () => {

    const searchValue =
    searchInput.value.toLowerCase();

    boxes.forEach((box) => {

        const text =
        box.textContent.toLowerCase();

        if (text.includes(searchValue)) {

            box.style.display = "flex";

        } else {

            box.style.display = "none";

        }

    });

});
/* =========================
   CALCULATOR FUNCTION
========================= */

const calcDisplay =
document.getElementById("calc-display");

const calcButtons =
document.querySelectorAll(".calc-btn");

const calcEquals =
document.getElementById("calc-equals");

const calcClear =
document.getElementById("calc-clear");

/* BUTTON CLICK */

calcButtons.forEach((button) => {

    button.addEventListener("click", () => {

        calcDisplay.value +=
        button.textContent;

    });

});

/* EQUAL BUTTON */

calcEquals.addEventListener("click", () => {

    try {

        calcDisplay.value =
        eval(calcDisplay.value);

    } catch {

        calcDisplay.value =
        "Error";

    }

});

/* CLEAR BUTTON */

calcClear.addEventListener("click", () => {

    calcDisplay.value = "";

});