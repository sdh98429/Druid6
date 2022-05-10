import {useState} from 'react';
export default function FileUpload() {

    const {ipcRenderer} =window.require("electron");
    const openFile = () =>{
        ipcRenderer.send("OpenFile","open");
    }

    const [filePath,setFilePath] = useState('');
    ipcRenderer.on("filePath",(event,arg)=>{
        setFilePath(arg);
    })

    const [hostInfo,setHostInfo] = useState({
        hostname:"",
        username:"",
        filePath:filePath,
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
            <button onClick = {openFile}>pem키 등록해주세요</button>
            <div>{filePath}</div>

            <button onClick = {connectSSH}>접속</button>
        </div>
        //버튼 클릭하면 ConnectSSH 접속
    );
}
