const {app,BrowserWindow,ipcMain} = require('electron');
const remote = require('@electron/remote/main');
const sshClient = require('./services/sshClient');
const install = require('./services/Install');
const network = require('./services/network');
remote.initialize()

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
          nodeIntegration: true,
          contextIsolation : false
           
        }
    })
 
    win.loadURL('http://localhost:3000')
  
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
    message: 'Do you want to do this?',
    detail: 'It does not really matter',
    checkboxLabel: 'Remember my answer',
    checkboxChecked: true,
  };

  dialog.showMessageBox(null, options, (response, checkboxChecked) => {  
 
    console.log(response);
    console.log(checkboxChecked);
  
  }).then(result=>{
    if(result.response == 1){
      install(event,hostInfo,filePath);
    }else{
      console.log('노다운');
    }
  })
}) 

ipcMain.on("ConnectSSH", (event, arg)=>{ 
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
