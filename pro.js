/* =========================
   CLOCK
========================= */

function updateClock() {

  const now = new Date();

  let hours = String(now.getHours()).padStart(2, "0");

  let minutes = String(now.getMinutes()).padStart(2, "0");

  let seconds = String(now.getSeconds()).padStart(2, "0");

  document.getElementById("clock").textContent =
    `${hours}:${minutes}:${seconds}`;
}

setInterval(updateClock, 1000);

updateClock();


/* =========================
   DARK MODE
========================= */

const darkModeBtn = document.getElementById("dark-mode-btn");

if (darkModeBtn) {

  darkModeBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark-mode");

  });

}


/* =========================
   PAGE NAVIGATION
========================= */

document.addEventListener("DOMContentLoaded", () => {

  const navLinks = document.querySelectorAll(".nav-link");

  const pages = document.querySelectorAll(".dashboard-page");

  navLinks.forEach((link) => {

    link.addEventListener("click", (e) => {

      e.preventDefault();

      navLinks.forEach((nav) => {
        nav.classList.remove("active");
      });

      link.classList.add("active");

      pages.forEach((page) => {
        page.classList.remove("active-page");
      });

      const pageId = link.getAttribute("data-page");

      const selectedPage = document.getElementById(pageId);

      if (selectedPage) {
        selectedPage.classList.add("active-page");
      }

    });

  });

});


/* =========================
   QUOTES
========================= */

const quotes = [
  "Stay Positive 🚀",
  "Never Give Up 🔥",
  "Dream Big ✨",
  "Code Every Day 💻",
  "Success is Coming 🌟",
  "Keep Learning 📚"
];

let currentQuote = 0;

const quoteBox = document.getElementById("quote-box");

if (quoteBox) {

  quoteBox.addEventListener("click", () => {

    currentQuote++;

    if (currentQuote >= quotes.length) {
      currentQuote = 0;
    }

    quoteBox.textContent = quotes[currentQuote];

  });

}


/* =========================
   STOPWATCH
========================= */

let stopwatchInterval = null;

let seconds = 0;
let minutes = 0;
let hours = 0;

const stopwatchDisplay = document.getElementById("stopwatch-display");

function updateStopwatch() {

  seconds++;

  if (seconds >= 60) {
    seconds = 0;
    minutes++;
  }

  if (minutes >= 60) {
    minutes = 0;
    hours++;
  }

  stopwatchDisplay.textContent =
    `${String(hours).padStart(2, "0")}:` +
    `${String(minutes).padStart(2, "0")}:` +
    `${String(seconds).padStart(2, "0")}`;
}


/* START */

const startStopwatch = document.getElementById("start-stopwatch");

if (startStopwatch) {

  startStopwatch.addEventListener("click", () => {

    if (stopwatchInterval !== null) return;

    stopwatchInterval = setInterval(updateStopwatch, 1000);

  });

}


/* STOP */

const stopStopwatch = document.getElementById("stop-stopwatch");

if (stopStopwatch) {

  stopStopwatch.addEventListener("click", () => {

    clearInterval(stopwatchInterval);

    stopwatchInterval = null;

  });

}


/* RESET */

const resetStopwatch = document.getElementById("reset-stopwatch");

if (resetStopwatch) {

  resetStopwatch.addEventListener("click", () => {

    clearInterval(stopwatchInterval);

    stopwatchInterval = null;

    seconds = 0;
    minutes = 0;
    hours = 0;

    stopwatchDisplay.textContent = "00:00:00";

  });

}


/* =========================
   NOTES APP
========================= */

const notesArea = document.getElementById("notes-area");

const saveNoteBtn = document.getElementById("save-note-btn");

window.addEventListener("load", () => {

  const savedNotes = localStorage.getItem("dashboardNotes");

  if (savedNotes && notesArea) {

    notesArea.value = savedNotes;

  }

});

if (saveNoteBtn && notesArea) {

  saveNoteBtn.addEventListener("click", () => {

    localStorage.setItem("dashboardNotes", notesArea.value);

    alert("Notes Saved");

  });

}


/* =========================
   CALCULATOR
========================= */

const calcDisplay = document.getElementById("calc-display");

const calcButtons = document.querySelectorAll(".calc-btn");

const calcEquals = document.getElementById("calc-equals");

const calcClear = document.getElementById("calc-clear");

calcButtons.forEach((button) => {

  button.addEventListener("click", () => {

    calcDisplay.value += button.textContent;

  });

});

if (calcEquals) {

  calcEquals.addEventListener("click", () => {

    try {

      calcDisplay.value = eval(calcDisplay.value);

    } catch {

      calcDisplay.value = "Error";

    }

  });

}

if (calcClear) {

  calcClear.addEventListener("click", () => {

    calcDisplay.value = "";

  });

}