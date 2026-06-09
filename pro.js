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

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidCalculatorExpression(expression) {
  return /^[0-9+\-*/().\s]+$/.test(expression);
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
/* Lightweight dashboard script tailored for grid.html
   - initializes interactive widgets only when their elements exist
   - removes authentication code not present in grid.html
*/

function isValidCalculatorExpression(expression) {
  return /^[0-9+\-*/().\s]+$/.test(expression);
}

function showToast(message, duration = 2400) {
  const toast = document.getElementById("toast");
  if (!toast) return alert(message);
  toast.textContent = message;
  toast.classList.add("toast-show");
  clearTimeout(toast._timeout);
  toast._timeout = setTimeout(() => toast.classList.remove("toast-show"), duration);
}

function hydrateProgressBars() {
  document.querySelectorAll(".progress").forEach((bar) => {
    const value = bar.dataset.progress || bar.style.width || "0";
    if (String(value).includes("%")) bar.style.width = value;
    else bar.style.width = `${value}%`;
  });
}

function updateAnalyticsCards() {
  const cards = document.querySelectorAll(".analytics-card");
  if (!cards.length) return;
  const data = [
    { v: `$${Math.round(35 + Math.random() * 85)}k`, e: `+${Math.round(5 + Math.random() * 16)}% this month` },
    { v: `${Math.round(900 + Math.random() * 450)}`, e: `+${Math.round(4 + Math.random() * 12)}% this week` },
    { v: `${Math.round(210 + Math.random() * 190)}`, e: `+${Math.round(8 + Math.random() * 18)}% today` },
    { v: `${Math.round(80 + Math.random() * 18)}%`, e: `Strong` }
  ];
  cards.forEach((c, i) => {
    const p = c.querySelector("p");
    const s = c.querySelector("span");
    if (p) p.textContent = data[i]?.v || p.textContent;
    if (s) s.textContent = data[i]?.e || s.textContent;
  });
}

document.addEventListener("DOMContentLoaded", () => {
  // CLOCK
  const clockEl = document.getElementById("clock");
  if (clockEl) {
    const updateClock = () => {
      const now = new Date();
      clockEl.textContent = [now.getHours(), now.getMinutes(), now.getSeconds()].map(n => String(n).padStart(2, '0')).join(':');
    };
    updateClock();
    setInterval(updateClock, 1000);
  }

  // Dark mode toggle
  const darkModeBtn = document.getElementById("dark-mode-btn");
  if (darkModeBtn) {
    const stored = localStorage.getItem('dashboardDarkMode') === 'true';
    if (stored) document.body.classList.add('dark-mode');
    darkModeBtn.addEventListener('click', () => {
      const isDark = document.body.classList.toggle('dark-mode');
      localStorage.setItem('dashboardDarkMode', isDark);
      darkModeBtn.textContent = isDark ? 'Light' : 'Dark';
    });
  }

  // Sidebar menu
  const menuBtn = document.getElementById('menu-btn');
  const sidebarMenu = document.querySelector('.sidebar-menu');
  if (menuBtn && sidebarMenu) menuBtn.addEventListener('click', () => sidebarMenu.classList.toggle('sidebar-open'));

  // Page navigation links
  const navLinks = document.querySelectorAll('.nav-link');
  const pages = document.querySelectorAll('.dashboard-page');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      navLinks.forEach(n => n.classList.remove('active'));
      link.classList.add('active');
      pages.forEach(p => p.classList.remove('active-page'));
      const id = link.dataset.page;
      const sel = document.getElementById(id);
      if (sel) sel.classList.add('active-page');
      if (sidebarMenu && sidebarMenu.classList.contains('sidebar-open')) sidebarMenu.classList.remove('sidebar-open');
    });
  });

  // Notes
  const notesArea = document.getElementById('notes-area');
  const saveNoteBtn = document.getElementById('save-note-btn');
  const clearNoteBtn = document.getElementById('clear-note-btn');
  if (notesArea) {
    const saved = localStorage.getItem('dashboardNotes');
    if (saved) notesArea.value = saved;
  }
  if (saveNoteBtn && notesArea) saveNoteBtn.addEventListener('click', () => {
    const v = notesArea.value.trim();
    if (!v) return showToast('Please write a note before saving.');
    localStorage.setItem('dashboardNotes', v);
    showToast('Notes saved');
  });
  if (clearNoteBtn && notesArea) clearNoteBtn.addEventListener('click', () => { notesArea.value = ''; localStorage.removeItem('dashboardNotes'); showToast('Notes cleared'); });

  // Stopwatch
  const stopwatchDisplay = document.getElementById('stopwatch-display');
  let swInterval = null, swSec = 0, swMin = 0, swHour = 0;
  function renderStopwatch() { if (stopwatchDisplay) stopwatchDisplay.textContent = `${String(swHour).padStart(2,'0')}:${String(swMin).padStart(2,'0')}:${String(swSec).padStart(2,'0')}`; }
  const startBtn = document.getElementById('start-stopwatch');
  const stopBtn = document.getElementById('stop-stopwatch');
  const resetBtn = document.getElementById('reset-stopwatch');
  if (startBtn) startBtn.addEventListener('click', () => { if (swInterval) return; swInterval = setInterval(() => { swSec++; if (swSec>=60){swSec=0; swMin++;} if (swMin>=60){swMin=0; swHour++;} renderStopwatch(); }, 1000); });
  if (stopBtn) stopBtn.addEventListener('click', () => { clearInterval(swInterval); swInterval = null; });
  if (resetBtn) resetBtn.addEventListener('click', () => { clearInterval(swInterval); swInterval=null; swSec=swMin=swHour=0; renderStopwatch(); });

  // Background changer
  const bgButton = document.getElementById('change-bg-btn');
  if (bgButton) {
    const backgrounds = ['#f4f4f4','#dbeafe','#dcfce7','#fae8ff','#ffe4e6'];
    bgButton.addEventListener('click', () => {
      const color = backgrounds[Math.floor(Math.random()*backgrounds.length)];
      document.body.style.background = color;
      localStorage.setItem('dashboardBackground', color);
    });
    const storedBg = localStorage.getItem('dashboardBackground'); if (storedBg) document.body.style.background = storedBg;
  }

  // Theme buttons
  document.querySelectorAll('.theme-btn').forEach(btn => btn.addEventListener('click', () => {
    if (btn.classList.contains('blue-theme')) document.documentElement.style.setProperty('--primary', '#2563eb');
    if (btn.classList.contains('green-theme')) document.documentElement.style.setProperty('--primary', '#10b981');
    if (btn.classList.contains('purple-theme')) document.documentElement.style.setProperty('--primary', '#8b5cf6');
  }));

  // Search boxes
  const searchInput = document.querySelector('.search-input');
  const searchBtn = document.querySelector('.search-btn');
  const boxes = document.querySelectorAll('.box');
  function filterBoxes(q){ boxes.forEach(b => { const t = b.textContent.toLowerCase(); b.style.display = t.includes(q) ? 'flex' : 'none'; }); }
  if (searchInput) searchInput.addEventListener('input', () => filterBoxes(searchInput.value.trim().toLowerCase()));
  if (searchBtn && searchInput) searchBtn.addEventListener('click', () => { const v = searchInput.value.trim().toLowerCase(); if (!v) return showToast('Please enter a search term'); filterBoxes(v); });

  // Chat support
  const chatInput = document.querySelector('.chat-input-area input[type="text"]');
  const chatSendButton = document.querySelector('.chat-input-area button');
  const chatBox = document.querySelector('.chat-box');
  if (chatSendButton && chatInput && chatBox) {
    const send = () => {
      const msg = chatInput.value.trim(); if (!msg) return showToast('Type a message before sending.');
      const el = document.createElement('div'); el.className='chat-message sent'; el.innerHTML = `<p>${msg}</p>`; chatBox.appendChild(el); chatInput.value=''; chatBox.scrollTop = chatBox.scrollHeight;
      setTimeout(()=>{ const r = document.createElement('div'); r.className='chat-message received'; r.innerHTML='<p>Thanks! We will review your request and respond shortly.</p>'; chatBox.appendChild(r); chatBox.scrollTop = chatBox.scrollHeight; }, 800);
    };
    chatSendButton.addEventListener('click', send);
    chatInput.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); send(); } });
  }

  // Hydrate UI pieces
  hydrateProgressBars();
  updateAnalyticsCards();

  // Calculator
  const calcDisplay = document.getElementById('calc-display');
  const calcButtons = document.querySelectorAll('.calc-btn');
  const calcEquals = document.getElementById('calc-equals');
  const calcClear = document.getElementById('calc-clear');
  if (calcDisplay && calcButtons.length){ calcButtons.forEach(b => b.addEventListener('click', ()=>{ if (calcDisplay.value === 'Error') calcDisplay.value=''; calcDisplay.value += b.textContent; })); }
  if (calcEquals && calcDisplay) calcEquals.addEventListener('click', ()=>{ const expr = calcDisplay.value.trim(); if (!expr) return showToast('Enter a calculation first.'); if (!isValidCalculatorExpression(expr)) { calcDisplay.value='Error'; return showToast('Invalid calculator input.'); } try{ calcDisplay.value = String(eval(expr)); } catch { calcDisplay.value='Error'; showToast('Invalid calculation.'); } });
  if (calcClear && calcDisplay) calcClear.addEventListener('click', ()=> calcDisplay.value='');

  // Task list persistence
  function saveTaskState(){ const data = {}; document.querySelectorAll('.task-item').forEach(item=>{ const cb = item.querySelector("input[type='checkbox']"); const label = item.querySelector('span')?.textContent?.trim(); if (label && cb) data[label]=cb.checked; }); localStorage.setItem('dashboardTasks', JSON.stringify(data)); }
  function loadTaskState(){ const stored = JSON.parse(localStorage.getItem('dashboardTasks')||'{}'); document.querySelectorAll('.task-item').forEach(item=>{ const cb = item.querySelector("input[type='checkbox']"); const label = item.querySelector('span')?.textContent?.trim(); if (label && cb && stored.hasOwnProperty(label)){ cb.checked = stored[label]; item.classList.toggle('completed', cb.checked); item.style.opacity = cb.checked ? '0.6' : '1'; } if (cb){ cb.addEventListener('change', ()=>{ item.classList.toggle('completed', cb.checked); item.style.opacity = cb.checked ? '0.6' : '1'; saveTaskState(); showToast((cb.checked? 'Completed: ':'Uncompleted: ')+ (label||'Task')); }); } }); }
  loadTaskState();

  // Quick action buttons
  document.querySelectorAll('.quick-actions button').forEach(btn => btn.addEventListener('click', ()=> showToast(btn.textContent.trim() + ' executed')));

  // Small hover interactions
  document.querySelectorAll('.project-card').forEach(card => { card.addEventListener('mouseenter', ()=> card.style.transform='translateY(-6px)'); card.addEventListener('mouseleave', ()=> card.style.transform=''); });

});

