const {app,BrowserWindow,ipcMain} = require('electron');
 
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
          contextIsolation : false
           
        }
    })
 
    win.loadURL('http://localhost:3000')
    const conn = new Client();
  
  conn.on('ready', () => {
    console.log('Client :: ready2');
    setInterval(function (){
      conn.exec(`free -m | grep Mem | awk '{print (($2-$6)/$2)*100}'`
      , (err, stream) => {
        if (err) throw err;
        stream.on('close', (code, signal) => {
          //console.log('Stream :: close :: code: ' + code + ', signal: ' + signal);
          //conn.end();
        }).on('data', (data) => {
          resultMemory=data;
          console.log('MEMORY: ' + data);
        }).stderr.on('data', (data) => {
          console.log('STDERR: ' + data);
        });
      });
    },1000)
    setInterval(function (){
      conn.exec(`df . | grep /dev | awk '{print $5}'`
      , (err, stream) => {
        if (err) throw err;
        stream.on('close', (code, signal) => {
          //console.log('Stream :: close :: code: ' + code + ', signal: ' + signal);
          //conn.end();
        }).on('data', (data) => {
          
          resultDisk=data;
          console.log('DISK: ' + data);
        }).stderr.on('data', (data) => {
          console.log('STDERR: ' + data);
        });
      });
    },1000)
    setInterval(function (){
      conn.exec(`top -b -n 1 | grep -Po '[0-9.]+ id' | head -1 | awk '{print 100-$1}'`
      , (err, stream) => {
        if (err) throw err;
        stream.on('close', (code, signal) => {
          //console.log('Stream :: close :: code: ' + code + ', signal: ' + signal);
          //conn.end();
        }).on('data', (data) => {
          resultCpu=data;
          
          console.log('CPU: ' + data);
        }).stderr.on('data', (data) => {
          console.log('STDERR: ' + data);
        });
      });
    },1000)
  }).connect({
  host: '3.38.101.66',
  port: 22,
  username: 'ubuntu',
  privateKey: require('fs').readFileSync('/K6S204T.pem')
});

    remote.enable(win.webContents);
}

ipcMain.on("SEND_MAIN_PING", (event, arg)=>{ 
    console.log('Main received a ping!!!'); 
    console.log(resultCpu.toString());
    event.reply('reply',resultCpu.toString());
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
