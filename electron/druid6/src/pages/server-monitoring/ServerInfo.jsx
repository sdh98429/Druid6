import {useState} from 'react';
import "./ServerMonitoring.scss";
export default function ServerInfo() {
  const {ipcRenderer} =window.require("electron");
  const [processInfo,setProcessInfo] = useState('');
  ipcRenderer.on("processInfo",(event,arg)=>{
    setProcessInfo(arg);
  })

  const [osInfo,setOsInfo] = useState('');
  ipcRenderer.on("osInfo",(event,arg)=>{
    setOsInfo(arg);
  })

  const [ramInfo,setRamInfo] = useState('');
  ipcRenderer.on("ramInfo",(event,arg)=>{
    setRamInfo(arg);
  })

  const [systemInfo,setSystemInfo] = useState('');
  ipcRenderer.on("systemInfo",(event,arg)=>{
    setSystemInfo(arg);
  })

  const [kernelVersion,setKernelVersion] = useState('');
  ipcRenderer.on("kernelVersion",(event,arg)=>{
    setKernelVersion(arg);
  })

  const [kernelRelease,setKernelRelease] = useState('');
  ipcRenderer.on("kernelRelease",(event,arg)=>{
    setKernelRelease(arg);
  })
  return (
    <div className='badgeLong'>
    <div>프로세스 정보 : {processInfo}</div>
    <div>운영체제 정보 : {osInfo}</div>
    <div>설치된 램 : {ramInfo} gb</div>
    <div>커널 릴리즈 버젼 : {kernelRelease}</div>
    <div>커널 버젼 : {kernelVersion}</div>
    <div>시스템 종류 : {systemInfo}</div>
  </div>
  );
}
