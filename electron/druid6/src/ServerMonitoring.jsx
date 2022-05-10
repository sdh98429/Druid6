import {useState} from 'react';
import FileUpload from './FileUpload.jsx';

export default function ServerMonitoring() {
  
  const {ipcRenderer} =window.require("electron");
  
  const [cpuUsage,setCpuUsage] = useState('');
  ipcRenderer.on("cpu",(event,arg)=>{
    setCpuUsage(arg);
  })

  const [DiskUsage,setDiskUsage] = useState('');
  ipcRenderer.on("disk",(event,arg)=>{
    setDiskUsage(arg);
  })

  const [MemoryUsage,setMemoryUsage] = useState('');
  ipcRenderer.on("memory",(event,arg)=>{
    setMemoryUsage(arg);
  })

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
    <div>
      <h1>ServerMonitoring</h1>
       <FileUpload /> 
      <div>프로세스 정보 : {processInfo}</div>
      <div>운영체제 정보 : {osInfo}</div>
      <div>설치된 램 : {ramInfo} gb</div>
      <div>커널 릴리즈 버젼 : {kernelRelease}</div>
      <div>커널 버젼 : {kernelVersion}</div>
      <div>시스템 종류 : {systemInfo}</div>

      <div>cpu사용량 : {cpuUsage}%</div>
      <div>memory사용량 : {MemoryUsage}%</div>
      <div>disk 사용량 : {DiskUsage}</div> 

    </div>
  );
}
