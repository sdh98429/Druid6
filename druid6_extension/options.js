const nameInput = document.getElementById("name-input");
const timeInput = document.getElementById("time-input");
const saveBtn = document.getElementById("save-btn");

saveBtn.addEventListener("click", () => {
  const name = nameInput.value;
  const notificationTime = timeInput.value;
  chrome.storage.sync.set({
    name,
    notificationTime,
  }, () => {
    console.log(`이름이 ${name}로 설정되었습니다!`);
    console.log(`알림간격이 ${notificationTime}로 설정되었습니다!`);
  });
});

chrome.storage.sync.get(["name", "notificationTime"], res => {
  console.log(res.name);
  console.log(res.notificationTime);
  nameInput.value = res.name ?? "???";
  timeInput.value = res.notificationTime ?? 1000;
});
