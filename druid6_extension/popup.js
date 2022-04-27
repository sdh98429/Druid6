const timeElement = document.getElementById("time");
const nameElement = document.getElementById("name");

const currentTime = new Date().toLocaleTimeString();
timeElement.textContent = `현재 시각은 ${currentTime} 입니다.`;

chrome.action.setBadgeText({
  text: "TIME",
}, () => {
  console.log("Finishied setting badge text")
})

chrome.storage.sync.get(["name"], res => {
  const name = res.name ?? "???";
  nameElement.textContent = `당신의 이름은 ${name}입니다.`;
});
