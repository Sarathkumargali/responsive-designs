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