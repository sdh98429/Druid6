const {app,BrowserWindow,ipcMain} = require('electron');
const remote = require('@electron/remote/main');
const sshClient = require('./sshClient');

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

ipcMain.on("SEND_MAIN_PING", (event, arg)=>{ 
    console.log('Main received a ping!!!'); 
    sshClient(event);
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
