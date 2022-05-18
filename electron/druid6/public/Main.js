const { app, BrowserWindow, ipcMain } = require('electron');
const remote = require('@electron/remote/main');
const path = require('path');
const isDev = require('electron-is-dev');
const install = require('./Install');
const network = require('./network');
const sshClient = require('./sshClient');

remote.initialize()

function createWindow() {
    const win = new BrowserWindow({
        width: 1440,
        height: 900,
        resizable: false,
        webPreferences: {
          nodeIntegration: false,
          contextIsolation: false,
          preload:__dirname +'/preload.js'
         
        }
    })
 
    win.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`)
  
    remote.enable(win.webContents);
}

let filePath;
let hostInfo;

ipcMain.on("OpenFile", (event, arg)=>{ 
  const {dialog} = require('electron');
  const options = {
    filters: [
      { name: 'pem', extensions: ['pem'] }
    ]
  };

  dialog.showOpenDialog(null, options, (filePaths) => {  
  }).then(result=>{
    filePath=result.filePaths[0];
    event.reply('filePath',filePath);
  });

}) 
ipcMain.on("AllowInstall", (event, arg)=>{ 
  const {dialog} = require('electron');
  const options = {
    type: 'question',
    buttons: ['Cancel', 'Yes, please', 'No, thanks'],
    defaultId: 2,
    title: 'Question',
    message: 'vnstat를 다운로드를 하시겠습니까?',
    detail: 'vnstat를 사용하지 않으면 네트워크 모니터링 서비스를 제공받으실수 없습니다.',
    
  };

  dialog.showMessageBox(null, options, (response, checkboxChecked) => {  
  }).then(result=>{
    if(result.response === 1){
      install(event,hostInfo,filePath);
      setTimeout(function(){
        network(event,hostInfo,filePath);
      },5000);
    }else{
      console.log('노다운');
    }
  })
}) 

ipcMain.on("ConnectSSH", async (event, arg)=>{ 
  hostInfo=arg;
  sshClient(event,hostInfo,filePath);
  network(event,hostInfo,filePath);
  
})

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
