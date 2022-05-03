const timeElement = document.getElementById("time");
const nameElement = document.getElementById("name");
const timerElement = document.getElementById("timer");

function updateTimeElements() {
  chrome.storage.local.get(["timer"], res => {
    const time = res.timer ?? 0;
    timerElement.textContent = `현재 초는 ${time}초 입니다.`;
  });
  const currentTime = new Date().toLocaleTimeString();
  timeElement.textContent = `현재 시각은 ${currentTime} 입니다.`;
}

updateTimeElements();
setInterval(updateTimeElements, 1000);

chrome.action.setBadgeText({
  text: "TIME",
}, () => {
  console.log("Finishied setting badge text")
})

chrome.storage.sync.get(["name"], res => {
  const name = res.name ?? "???";
  nameElement.textContent = `당신의 이름은 ${name}입니다.`;
});

const startBtn = document.getElementById("start");
const stopBtn = document.getElementById("stop");
const resetBtn = document.getElementById("reset");

startBtn.addEventListener("click", () => {
  chrome.storage.local.set({
    isRunning: true,
  });
});

stopBtn.addEventListener("click", () => {
  console.log('중지')
  chrome.storage.local.set({
    isRunning: false,
  });
});

resetBtn.addEventListener("click", () => {
  chrome.storage.local.set({
    timer: 0,
    isRunning: false,
  });
});
