const timer = document.getElementById("timer");
const stopBtn = document.getElementById("stop");
const resetBtn = document.getElementById("reset");
const playBtn = document.getElementById("play");
const set = document.getElementById("set");
const alarm = document.getElementById("alarm");

const settingButton = document.getElementById("setting");
const setReset = document.getElementById("setReset");

let breakMinutes = 0;
let breakSeconds = 0;
let sets = 0;

settingButton.addEventListener("click", () => {
  breakMinutes = document.getElementById("break-minutes").value || 0;
  breakSeconds = document.getElementById("break-seconds").value || 0;
  console.log(`Break time set to ${breakMinutes} minutes and ${breakSeconds} seconds`);
});

timer.innerHTML = "00:00:00";

let hours = 0;
let minutes = 0;
let seconds = 0;
let timerInterval;
let stopped = true;
let alarmPlaying = false;

function startTimer() {
  if (stopped) {
    stopped = false;
    sets++;
    set.innerHTML = "SETS: " + sets;
    timerInterval = setInterval(function () {
      seconds++;
      if (seconds == 60) {
        seconds = 0;
        minutes++;
      }
      if (minutes == 60) {
        minutes = 0;
        hours++;
      }
      var timeString =
        (hours ? (hours > 9 ? hours : "0" + hours) : "00") +
        ":" +
        (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") +
        ":" +
        (seconds > 9 ? seconds : "0" + seconds);
      document.getElementById("timer").innerHTML = timeString;

      if (minutes == breakMinutes && seconds == breakSeconds && !alarmPlaying) {
        alarm.play();
        alarmPlaying = true;
      }
    }, 1000);
  }
}

function stopTimer() {
  if (!stopped) {
    stopped = true;
    clearInterval(timerInterval);
    alarm.pause();
    alarmPlaying = false;
  }
}

function resetTimer() {
  clearInterval(timerInterval);
  hours = 0;
  minutes = 0;
  seconds = 0;
  document.getElementById("timer").innerHTML = "00:00:00";
  stopped = true;
  alarm.pause();
  alarm.currentTime = 0;
  alarmPlaying = false;
}


function stopAlarm() {
  if (alarmPlaying) {
    alarm.pause();
    alarm.currentTime = 0;
    alarmPlaying = false;
  }
}

playBtn.addEventListener("click", () => {
  startTimer();
});

stopBtn.addEventListener("click", () => {
  stopTimer();
  stopAlarm()
});

resetBtn.addEventListener("click", () => {
  resetTimer();
  stopAlarm()
});

alarm.addEventListener("pause", () => {
  alarmPlaying = false;
});

alarm.addEventListener("ended", () => {
  alarmPlaying = false;
});

setReset.addEventListener("click", () => {
  sets = 0;
  set.innerHTML = "SETS: " + sets;
});
