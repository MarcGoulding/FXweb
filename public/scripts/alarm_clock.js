const currentTime = document.querySelector("#currentTime");
const selectMenu = document.querySelectorAll("select");
let setAlarmButton = document.querySelector("#setAlarmButton");

let alarmTime;
let isAlarmSet = false;
const ringtone = new Audio('assets/alarm.mp3');

setAlarmButton.onclick = setAlarm;


for (let i=23; i>=0; i--) {
  i = i<10? "0" + i : i;
  let option = `<option value="${i}">${i}</option>`;
  selectMenu[0].firstElementChild.insertAdjacentHTML("afterend", option);
}
for (let i=50; i>=0; i = i-1) {
  i = i<10? "0" + i : i;
  let option = `<option value="${i}">${i}</option>`;
  selectMenu[1].firstElementChild.insertAdjacentHTML("afterend", option);
}

function updateAlarmClock() {
  let date = new Date();
  h = date.getHours();
  m = date.getMinutes();
  s = date.getSeconds();
  h = h<10 ? "0" + h : h;
  m = m<10 ? "0" + m : m;
  s = s<10 ? "0" + s : s;

  currentTime.innerText = `${h}:${m}:${s}`;

  if (alarmTime == `${h}:${m}`) {
    ringtone.play();
    ringtone.loop = true;
  }
} setInterval(updateAlarmClock, 1000);

function setAlarm(){
  let time = `${selectMenu[0].value}:${selectMenu[1].value}`;
  if (isAlarmSet) {
    ringtone.pause();
    alarmTime = "";
    isAlarmSet = false;
    setAlarmButton.innerText = "set";
    console.log(`Removed alarm ${time}`);
    return;
  }

  if (time.includes("Hour") || time.includes("Minutes")) return alert("Please select a valid time to set alarm!");
  alarmTime = time;
  console.log(`Set alarm ${time}`);
  isAlarmSet = true;
  setAlarmButton.innerText = "clear";
}


