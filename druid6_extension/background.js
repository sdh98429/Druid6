chrome.alarms.create({
  periodInMinutes: 1 / 60,
});

chrome.alarms.onAlarm.addListener((alarm) => {
  chrome.storage.local.get(["timer", "isRunning"], res => {
    const time = res.timer ?? 0
    const isRunning = res.isRunning ?? true;
    if (!isRunning) {
      return
    }

    chrome.storage.local.set({
      timer: time + 1,
    })

    chrome.action.setBadgeText({
      text: `${time + 1}`
    })

    chrome.storage.sync.get(["notificationTime"], res => {
      const notificationTime = res.notificationTime ?? 1000;
      if (time % notificationTime === 0) {
        console.log(`notificationTime is ${notificationTime}`);
        console.log(this);
        this.registration.showNotification("Druid6 타이머 익스텐션", {
          body: `${notificationTime}초가 지났어요!`,
          icon: "icon.png",
        });
      }
    });
  })
});
