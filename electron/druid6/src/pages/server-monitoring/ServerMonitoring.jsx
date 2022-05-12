import { useState } from 'react';
import ServerInfo from './ServerInfo.jsx';

import "./ServerMonitoring.scss";

export default function ServerMonitoring() {
  const {ipcRenderer} =window.require("electron");

  const initialServerInfo = {
    'cpu': '',
    'disk': '',
    'memory': '',
    'processInfo': '',
    'osInfo': '',
    'ramInfo': '',
    'systemInfo': '',
    'kernelVersion': '',
    'kernelRelease': '',
    'networkRealTime': '',
    'networkHours': '',
  };

  const [serverInfo, setServerInfo] = useState(initialServerInfo);

  ipcRenderer.on("cpu", (event,arg)=>{
    setServerInfo({
      ...serverInfo,
      'cpu': arg,
    });
  })

  ipcRenderer.on("disk",(event,arg)=>{
    setServerInfo({
      ...serverInfo,
      'disk': arg,
    });
  })

  ipcRenderer.on("memory",(event,arg)=>{
    setServerInfo({
      ...serverInfo,
      'memory': arg,
    });
  })

  ipcRenderer.on("processInfo",(event,arg)=>{
    setServerInfo({
      ...serverInfo,
      'processInfo': arg,
    });
  })

  ipcRenderer.on("osInfo",(event,arg)=>{
    setServerInfo({
      ...serverInfo,
      'osInfo': arg,
    });
  })

  ipcRenderer.on("ramInfo",(event,arg)=>{
    setServerInfo({
      ...serverInfo,
      'ramInfo': arg,
    });
  })

  ipcRenderer.on("systemInfo",(event,arg)=>{
    setServerInfo({
      ...serverInfo,
      'systemInfo': arg,
    });
  })
  ipcRenderer.on("kernelVersion",(event,arg)=>{
    setServerInfo({
      ...serverInfo,
      'kernelVersion': arg,
    });
  })
  ipcRenderer.on("kernelRelease",(event,arg)=>{
    setServerInfo({
      ...serverInfo,
      'kernelRelease': arg,
    });
  })
  ipcRenderer.on("networkRealTime",(event,arg)=>{
    setServerInfo({
      ...serverInfo,
      'networkRealTime': arg,
    });
  })
  ipcRenderer.on("networkHours",(event,arg)=>{
    setServerInfo({
      ...serverInfo,
      'networkHours': arg,
    });
  })

  return (
    <div className='ServerMonitoring'>
      <h1>ServerMonitoring</h1>
       <ServerInfo serverInfo={serverInfo} />
    </div>
  );
}
