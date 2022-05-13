import {useState} from 'react';
import { Button } from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
export default function FileUpload() {

    const {ipcRenderer} =window.require("electron");
   
    const openFile = () =>{
        ipcRenderer.send("OpenFile", "open");
    }

    const allowInstall = () =>{
        ipcRenderer.send("AllowInstall","allow");
    }

    const [filePath,setFilePath] = useState('');
    ipcRenderer.on("filePath",(event,arg)=>{
        setFilePath(arg);
    })

    const [hostInfo,setHostInfo] = useState({
        hostname: "",
        username: "",
        filePath: "",
    })

    const onChangeHostInfo = (e) => {
        console.log(e);
        setHostInfo({
            ...hostInfo,
            [e.target.name] : e.target.value,
        })
    }

    const connectSSH = () =>{
        ipcRenderer.send('ConnectSSH',hostInfo);
    }
    
    return (
        <div>
            <input id="hostname" name="hostname" onChange={onChangeHostInfo}/> 
            
            <input id="username" name="username" onChange={onChangeHostInfo}/>
            <Button
        
        startIcon={<UploadFileIcon />} onClick={openFile}>pem키 등록해주세요</Button>
            <div id="filePath" name="filePath">{filePath}</div>

            <Button variant="contained" onClick={connectSSH}>접속</Button>
            <Button onClick={allowInstall}>접속허가</Button>
        </div>
        //버튼 클릭하면 ConnectSSH 접속
    );
}
