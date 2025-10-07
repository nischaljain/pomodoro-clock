// how many seconds are left on the timer (25 minutes to start)
let remainingSeconds = 25 * 60;

// holds the ID that setInterval() returns; null means "not running"
let intervalId = null;

// grab the elements we need to read/update
const timerEl = document.getElementById('timer');
const startBtn = document.getElementById('start');
const pauseBtn = document.getElementById('pause');
const resetBtn = document.getElementById('reset');

// update the on-screen time from remainingSeconds
function render() {
  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;
  timerEl.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

// called once per second while running
function tick() {
  if (remainingSeconds === 0) {
    pauseTimer();           // stop when we hit 00:00
    return;
  }
  remainingSeconds -= 1;    // move time forward by one second
  render();                 // redraw the timer
}

// start counting down if not already running
function startTimer() {
  if (intervalId !== null) return;           // guard: already running
  intervalId = setInterval(tick, 1000);      // call tick() every 1000ms
  startBtn.disabled = true;                  // reflect running state in UI
  pauseBtn.disabled = false;
}

// pause the countdown if running
function pauseTimer() {
  if (intervalId === null) return;           // guard: not running
  clearInterval(intervalId);                 // stop the repeating calls
  intervalId = null;                         
  startBtn.disabled = false;                 // reflect paused state in UI
  pauseBtn.disabled = true;
}

// reset back to 25:00 and pause
function resetTimer() {
  pauseTimer();                               // ensure it’s stopped
  remainingSeconds = 25 * 60;                 // restore initial value
  render();                                   // redraw the timer
}

// wire up button clicks to functions
startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);

// initial UI setup
pauseBtn.disabled = true;  // can't pause when not running
render();                  // show 25:00 at load
