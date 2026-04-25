let time = 10;
let interval = null;

function updateDisplay() {
  document.getElementById("time").innerHTML = time;
}

function startTimer() {
  if (interval !== null) return; // prevent multiple intervals

  interval = setInterval(function () {
    if (time > 0) {
      time--;
      updateDisplay();
    } else {
      clearInterval(interval);
      interval = null;
      alert("Time's up!");
    }
  }, 1000);
}

function resetTimer() {
  clearInterval(interval);
  interval = null;
  time = 10;
  updateDisplay();
}

// initial display
updateDisplay();