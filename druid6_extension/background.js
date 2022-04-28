chrome.alarms.create({
  periodInMinutes: 1 / 60,
});

chrome.alarms.onAlarm.addListener((alarm) => {
  chrome.storage.local.get(["timer"], res => {
    const time = res.timer ?? 0
    chrome.storage.local.set({
      timer: time + 1,
    })

    chrome.action.setBadgeText({
      text: `${time + 1}`
    })
    if (time % 10 === 0) {
      this.registration.showNotification("Druid6 타이머 익스텐션", {
        body: "10초가 지났어요!",
        icon: "icon.png",
      });
    }
  })
});
