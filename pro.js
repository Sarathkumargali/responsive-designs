/* =========================
   CLOCK
========================= */

function updateClock() {

  const now = new Date();

  let hours = String(now.getHours()).padStart(2, "0");

  let minutes = String(now.getMinutes()).padStart(2, "0");

  let seconds = String(now.getSeconds()).padStart(2, "0");

  const clock = document.getElementById("clock");

  if (clock) {

    clock.textContent =
      `${hours}:${minutes}:${seconds}`;

  }

}

/* REMOVE BELOW LINE IF YOU DON'T WANT LIVE CLOCK */

setInterval(updateClock, 1000);

updateClock();


/* =========================
   DARK MODE
========================= */

const darkModeBtn = document.getElementById("dark-mode-btn");

function applyTheme(primary, secondary) {
  document.documentElement.style.setProperty("--primary", primary);
  document.documentElement.style.setProperty("--secondary", secondary);
  document.documentElement.style.setProperty(
    "--gradient",
    `linear-gradient(135deg, ${primary}, ${secondary})`
  );
}

function saveTheme(primary, secondary) {
  localStorage.setItem(
    "dashboardTheme",
    JSON.stringify({ primary, secondary })
  );
}

const storedTheme = JSON.parse(localStorage.getItem("dashboardTheme"));
if (storedTheme) {
  applyTheme(storedTheme.primary, storedTheme.secondary);
}

if (darkModeBtn) {
  const storedDark = localStorage.getItem("dashboardDarkMode") === "true";
  if (storedDark) {
    document.body.classList.add("dark-mode");
    darkModeBtn.textContent = "Light Mode";
  }

  darkModeBtn.addEventListener("click", () => {
    const isDark = document.body.classList.toggle("dark-mode");
    localStorage.setItem("dashboardDarkMode", isDark);
    darkModeBtn.textContent = isDark ? "Light Mode" : "Dark Mode";
  });
}

const menuBtn = document.getElementById("menu-btn");
const sidebarMenu = document.querySelector(".sidebar-menu");

if (menuBtn && sidebarMenu) {
  menuBtn.addEventListener("click", () => {
    sidebarMenu.classList.toggle("sidebar-open");
  });
}

const heroButton = document.querySelector(".hero-btn");
const homePage = document.getElementById("home-page");

if (heroButton && homePage) {
  heroButton.addEventListener("click", () => {
    homePage.scrollIntoView({ behavior: "smooth" });
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

      /* REMOVE ACTIVE CLASS */

      navLinks.forEach((nav) => {

        nav.classList.remove("active");

      });

      /* ADD ACTIVE CLASS */

      link.classList.add("active");

      /* HIDE ALL PAGES */

      pages.forEach((page) => {

        page.classList.remove("active-page");

      });

      /* SHOW SELECTED PAGE */

      const pageId = link.getAttribute("data-page");

      const selectedPage = document.getElementById(pageId);

      if (selectedPage) {

        selectedPage.classList.add("active-page");

      }

      if (sidebarMenu && sidebarMenu.classList.contains("sidebar-open")) {

        sidebarMenu.classList.remove("sidebar-open");

      }

    });

  });

});


/* =========================
   LOGIN SYSTEM
========================= */

const loginBtn = document.getElementById("login-btn");

const registerBtn = document.getElementById("register-btn");

const logoutBtn = document.getElementById("logout-btn");

const welcomeUser = document.getElementById("welcome-user");


/* REGISTER */

if (registerBtn) {

  registerBtn.addEventListener("click", () => {

    const name = document.getElementById("register-name").value;

    const email = document.getElementById("register-email").value;

    const password = document.getElementById("register-password").value;

    if (name === "" || email === "" || password === "") {

      alert("Please fill all fields");

      return;

    }

    const user = {

      name,
      email,
      password

    };

    localStorage.setItem("dashboardUser", JSON.stringify(user));

    showToast("Registration successful. You can now log in.");

  });

}


/* LOGIN */

if (loginBtn) {

  loginBtn.addEventListener("click", () => {

    const email = document.getElementById("login-email").value;

    const password = document.getElementById("login-password").value;

    const storedUser = JSON.parse(localStorage.getItem("dashboardUser"));

    if (
      storedUser &&
      email === storedUser.email &&
      password === storedUser.password
    ) {

      localStorage.setItem("dashboardLoggedIn", "true");
      updateAuthState();
      showToast("Login successful. Welcome back!");

    } else {

      showToast("Invalid email or password.");

    }

  });

}


/* LOGOUT */

if (logoutBtn) {

  logoutBtn.addEventListener("click", () => {

    localStorage.removeItem("dashboardLoggedIn");
    updateAuthState();
    showToast("Logged out successfully.");

  });

}


/* =========================
   SHOW PASSWORD
========================= */

const togglePasswordBtn =
  document.getElementById("toggle-password-btn");

if (togglePasswordBtn) {

  togglePasswordBtn.addEventListener("click", () => {

    const passwordInput =
      document.getElementById("login-password");

    if (passwordInput.type === "password") {

      passwordInput.type = "text";

      togglePasswordBtn.textContent = "Hide Password";

    } else {

      passwordInput.type = "password";

      togglePasswordBtn.textContent = "Show Password";

    }

  });

}


/* =========================
   NOTES APP
========================= */

const notesArea = document.getElementById("notes-area");

const saveNoteBtn = document.getElementById("save-note-btn");


/* LOAD NOTES */

window.addEventListener("load", () => {

  const savedNotes =
    localStorage.getItem("dashboardNotes");

  if (savedNotes && notesArea) {

    notesArea.value = savedNotes;

  }

});


/* SAVE NOTES */

if (saveNoteBtn && notesArea) {

  saveNoteBtn.addEventListener("click", () => {

    localStorage.setItem(
      "dashboardNotes",
      notesArea.value
    );

    alert("Notes Saved");

  });

}


/* =========================
   STOPWATCH
========================= */

let stopwatchInterval = null;

let seconds = 0;

let minutes = 0;

let hours = 0;

const stopwatchDisplay =
  document.getElementById("stopwatch-display");


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

const startStopwatch =
  document.getElementById("start-stopwatch");

if (startStopwatch) {

  startStopwatch.addEventListener("click", () => {

    if (stopwatchInterval !== null) return;

    stopwatchInterval =
      setInterval(updateStopwatch, 1000);

  });

}


/* STOP */

const stopStopwatch =
  document.getElementById("stop-stopwatch");

if (stopStopwatch) {

  stopStopwatch.addEventListener("click", () => {

    clearInterval(stopwatchInterval);

    stopwatchInterval = null;

  });

}


/* RESET */

const resetStopwatch =
  document.getElementById("reset-stopwatch");

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

  bgButton.addEventListener("click", () => {

    const randomColor =
      backgrounds[
        Math.floor(Math.random() * backgrounds.length)
      ];

    document.body.style.background = randomColor;
    saveBackgroundColor(randomColor);
  });

}

const themeButtons = document.querySelectorAll(".theme-btn");

if (themeButtons.length > 0) {
  themeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      if (button.classList.contains("blue-theme")) {
        applyTheme("#2563eb", "#7c3aed");
        saveTheme("#2563eb", "#7c3aed");
      } else if (button.classList.contains("green-theme")) {
        applyTheme("#10b981", "#14b8a6");
        saveTheme("#10b981", "#14b8a6");
      } else if (button.classList.contains("purple-theme")) {
        applyTheme("#8b5cf6", "#c084fc");
        saveTheme("#8b5cf6", "#c084fc");
      }
    });
  });
}


/* =========================
   SEARCH FUNCTION
========================= */

const searchInput =
  document.querySelector(".search-input");

const boxes =
  document.querySelectorAll(".box");

if (searchInput && boxes.length > 0) {

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

}


/* =========================
   EXTRA INTERACTIONS
========================= */

const toast = document.getElementById("toast");
let toastTimeout = null;

function showToast(message, duration = 2400) {
  if (!toast) {
    alert(message);
    return;
  }

  toast.textContent = message;
  toast.classList.add("toast-show");
  window.clearTimeout(toastTimeout);

  toastTimeout = window.setTimeout(() => {
    toast.classList.remove("toast-show");
  }, duration);
}

const authSection = document.querySelector(".auth-section");

function updateAuthState() {
  const storedUser = localStorage.getItem("dashboardUser");
  const isLoggedIn = localStorage.getItem("dashboardLoggedIn") === "true";
  const user = storedUser ? JSON.parse(storedUser) : null;

  if (isLoggedIn && user) {
    if (welcomeUser) welcomeUser.textContent = `Welcome, ${user.name}`;
    if (logoutBtn) logoutBtn.style.display = "inline-flex";
    if (authSection) authSection.classList.add("hidden");
  } else {
    if (welcomeUser) welcomeUser.textContent = "Welcome, Guest";
    if (logoutBtn) logoutBtn.style.display = "none";
    if (authSection) authSection.classList.remove("hidden");
  }
}

function saveBackgroundColor(color) {
  localStorage.setItem("dashboardBackground", color);
}

function loadBackgroundColor() {
  const storedBackground = localStorage.getItem("dashboardBackground");
  if (storedBackground) {
    document.body.style.background = storedBackground;
  }
}

function hydrateProgressBars() {
  document.querySelectorAll(".progress").forEach((bar) => {
    const value = bar.dataset.progress || "0";
    bar.style.width = `${value}%`;
  });
}

function updateAnalyticsCards() {
  const analyticsCards = document.querySelectorAll(".analytics-card");
  const analyticsData = [
    { label: "Total Revenue", value: `$${Math.round(35 + Math.random() * 85)}k`, extra: `+${Math.round(5 + Math.random() * 16)}% this month` },
    { label: "New Users", value: `${Math.round(900 + Math.random() * 450)}`, extra: `+${Math.round(4 + Math.random() * 12)}% this week` },
    { label: "Orders", value: `${Math.round(210 + Math.random() * 190)}`, extra: `+${Math.round(8 + Math.random() * 18)}% today` },
    { label: "Performance", value: `${Math.round(80 + Math.random() * 18)}%`, extra: "Strong momentum" }
  ];

  analyticsCards.forEach((card, index) => {
    const data = analyticsData[index];
    if (!data) return;
    const title = card.querySelector("h3");
    const value = card.querySelector("p");
    const extra = card.querySelector("span");
    if (title) title.textContent = data.label;
    if (value) value.textContent = data.value;
    if (extra) extra.textContent = data.extra;
  });
}

const clearNoteBtn = document.getElementById("clear-note-btn");
if (clearNoteBtn && notesArea) {
  clearNoteBtn.addEventListener("click", () => {
    notesArea.value = "";
    localStorage.removeItem("dashboardNotes");
    showToast("Notes cleared");
  });
}

const actionButtons = document.querySelectorAll(".actions-container button");
actionButtons.forEach((button) => {
  button.addEventListener("click", () => {
    showToast(`${button.textContent.trim()} executed`);
  });
});

loadBackgroundColor();
hydrateProgressBars();
updateAnalyticsCards();
updateAuthState();


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


/* BUTTON CLICK */

if (calcDisplay && calcButtons.length > 0) {
  calcButtons.forEach((button) => {
    button.addEventListener("click", () => {
      if (calcDisplay.value === "Error") {
        calcDisplay.value = "";
      }
      calcDisplay.value += button.textContent;
    });
  });
}


/* EQUAL */

if (calcEquals && calcDisplay) {

  calcEquals.addEventListener("click", () => {

    try {

      calcDisplay.value =
        eval(calcDisplay.value);

    } catch {

      calcDisplay.value = "Error";

    }

  });

}


/* CLEAR */

if (calcClear && calcDisplay) {

  calcClear.addEventListener("click", () => {

    calcDisplay.value = "";

  });

}