const {app,BrowserWindow,ipcMain} = require('electron');
const remote = require('@electron/remote/main');
const sshClient = require('./services/sshClient');


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

ipcMain.on("ConnectSSH", (event, arg)=>{ 
  hostInfo=arg;
  sshClient(event,hostInfo,filePath);
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
