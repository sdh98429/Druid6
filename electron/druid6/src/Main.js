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
    console.log(arg.mt);
    //sshClient(event,arg);
  }) 

ipcMain.on("OpenFile", (event, arg)=>{ 
  console.log("rec");
  const {dialog} = require('electron');
  const options = {
    //title: 'Open a file or folder',
    //defaultPath: '/path/to/something/',
    //buttonLabel: 'Do it',
    filters: [
      { name: 'pem', extensions: ['pem'] }
    ]
    //properties: ['showHiddenFiles'],
    //message: 'This message will only be shown on macOS'
  };

  dialog.showOpenDialog(null, options, (filePaths) => {
    
  }).then(result=>{
    console.log(result.filePaths[0]);
    sshClient(event,result.filePaths[0]);


  });
  

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
