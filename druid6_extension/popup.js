const timeElement = document.getElementById("time");
const currentTime = new Date().toLocaleTimeString();
timeElement.textContent = `현재 시각은 ${currentTime} 입니다.`;
console.log(currentTime);