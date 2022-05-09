import {useState} from 'react';

export default function ServerMonitoring() {
  const {ipcRenderer} =window.require("electron");
  const sendMain = () => {
    ipcRenderer.send("SEND_MAIN_PING", 'send what');
  }
  const [cpuUsage,setCpuUsage] = useState('');
  ipcRenderer.on("reply",(event,arg)=>{
    console.log('asd?');
    setCpuUsage(arg);
  })

  return (
    <div>
      <div id='text-box'>{cpuUsage}</div>
      <button onClick={sendMain}>Send Mail</button> 
    </div>
  );
}
