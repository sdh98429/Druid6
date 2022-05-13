const { app, BrowserWindow, ipcMain } = require('electron');
const remote = require('@electron/remote/main');
const path = require('path');
const isDev = require('electron-is-dev');
const install = require('./Install');
const network = require('./network');
const { FloodTwoTone, Login } = require('@mui/icons-material');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
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
 
    win.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`)
  
    remote.enable(win.webContents);
}

let filePath;
let hostInfo;
let scenarioInfo;
let baseURL;
let vusers;

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

ipcMain.on("StartScenario", async (event, arg)=>{ 
  scenarioInfo = arg;
  baseURL = scenarioInfo.domainname + ":" + scenarioInfo.portname;
  vusers = scenarioInfo.vusers;
  let flows = scenarioInfo.flows;
  let response = await something(flows[0]);
  console.log("response: ", response);
  
// login(baseURL, data){
//   return apiController({
//     url: baseURL + '/' + data.flows[0].name,
//     method: data.flows[0].method,
//     data : data.flow[0].data
//   })
// };
  // for (i = 0; i < scenarioInfo.flows.length; i++){
  //   instance[i] = axios.create({
  //     method : scenarioInfo.flows[i].method,
      
  //     data: scenarioInfo.flows[i].data
  //   });
    
  // }

}) 

const something = async (e) => {
  console.log(e.name)
  console.log(e.method)
  console.log(e.data)
  const res = await fetch(baseURL + '/' + e.name, {
    method: e.method,
    headers: {
      'Content-type' : 'application/json'
    },
    body: JSON.stringify(e.data)
  })
  return res.json()
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
