import { useState } from 'react';
import FileUpload from './FileUpload.jsx';
import ServerInfo from './ServerInfo.jsx';

import "./ServerMonitoring.scss";

export default function ServerMonitoring() {
  const {ipcRenderer} =window.require("electron");

  const initialServerInfo = {
    'cpu': '',
    'disk': '',
    'memory': '',
    'processInfo': '',
    'osInfo': 'ss',
    'ramInfo': '',
    'systemInfo': '',
    'kernelVersion': '',
    'kernelRelease': '',
    'networkRealTime': '',
    'networkHours': '',
  };

  const [serverInfo, setServerInfo] = useState(initialServerInfo);

  Object.keys(initialServerInfo).forEach(key => {
    ipcRenderer.on(key, (e, arg) => {
      setServerInfo({
        ...serverInfo,
        [key]: arg,
      })
    });
  })

  return (
    <div className='ServerMonitoring'>
      <h1>ServerMonitoring</h1>
       <FileUpload />
       <ServerInfo serverInfo={serverInfo} />
    </div>
  );
}
