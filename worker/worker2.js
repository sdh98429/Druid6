for (let i = 0; i < 100; i++) {
  // 위 worker에서 onmessage이벤트를 발생!

  setInterval(console.log("2noye"), 3000);
  postMessage(i);
}
