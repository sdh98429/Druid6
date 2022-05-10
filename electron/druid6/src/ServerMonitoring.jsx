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

  return (
    <div>
      <h1>ServerMonitoring</h1>
       <FileUpload /> 
      
      <div>{cpuUsage}</div>
      <div>{MemoryUsage}</div>
      <div>{DiskUsage}</div> 

    </div>
  );
}
