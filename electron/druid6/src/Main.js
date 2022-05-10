
const axios = require("axios");
const { Worker } = require('worker_threads')
const {app,BrowserWindow,ipcMain} = require('electron');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
 
const remote = require('@electron/remote/main');
//const path = require('path');
const Client = require('electron-ssh2').Client;
remote.initialize()
let resultCpu;
let resultDisk;
let resultMemory;
function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
          nodeIntegration: true,
          contextIsolation : false,
          nodeIntegrationInWorker: true,
          preload: __dirname+'/preload.js'
        }
    })
 
    win.loadURL('http://localhost:3000')
    remote.enable(win.webContents);
}

ipcMain.on("SEND_MAIN_PING", (event, arg)=>{ 
    console.log('Main received a ping!!!'); 
    console.log(resultCpu.toString());
    event.reply('reply',resultCpu.toString());
}) 

ipcMain.on("WORKER_RUN", async (event, arg)=>{ 

  const requests = []

  for (let i = 0 ; i < 100; i++) {
    requests[i]= something();
  }
  try {
    const result = await Promise.all(requests)
    result.map((item) => {
      console.log(item);
    })
  } catch (error) {
    console.log(error);
  }

  // let workerArr = []
  // for (let i= 0; i < 150; i++) {
  //   workerArr[i] = new Worker( __dirname + '/myWorker.js' )
  //   workerArr[i].on('message', (value) => {
  //     console.log(value)
  //   })
  //   workerArr[i].postMessage({
  //     duration : 2,
  //     url: 'http://k6s2041.p.ssafy.io:8080/api/v1/users/login',
  //     method: "POST",
  //     body: {
  //       email: "test123@test.com",
  //       password: "a123123123"
  //     }
  //   })
  // }
  event.reply('workerDone','hi');
}) 

const something = async(e) => {
  const response = await fetch('http://k6s2041.p.ssafy.io:8080/api/v1/users/login', {
    method: "POST",
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(
      {
        email: "test123@test.com",
        password: "a123123123"
      }
    )
  })
  return response.json()
}

app.on('ready', function(){
    createWindow();
 
})
 
app.on('window-all-closed', function() {
    if(process.platform !== 'darwin') {
        app.quit()
    }
})
 
app.on('activate', function() {
    if(BrowserWindow.getAllWindows().length === 0) createWindow()
})
