const nameInput = document.getElementById("name-input");
const saveBtn = document.getElementById("save-btn");

saveBtn.addEventListener("click", () => {
  const name = nameInput.value;
  chrome.storage.sync.set({
    name,
  }, () => {
    console.log(`이름이 ${name}로 설정되었습니다!`)
  });
});

chrome.storage.sync.get(["name", "test"], res => {
  console.log(res)
});
