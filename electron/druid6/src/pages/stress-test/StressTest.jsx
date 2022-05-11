import { useState } from 'react';

export default function StressTest() {   

    const {ipcRenderer} =window.require("electron");
    const openFile = () =>{
        ipcRenderer.send("OpenFile","open");
    }

    const [filePath,setFilePath] = useState('');
    ipcRenderer.on("filePath",(event,arg)=>{
        setFilePath(arg);
    })

    const [scenarioInfo,setScenarioInfo] = useState({
        domainname:"http://k6s2041.p.ssafy.io",
        portname: "8080",
        vusers: 5,
        flows: [
            {
                name : 'api/v1/users/login',
                method: 'POST',
                header: '',
                data: {
                    email: 'test1@test.com',
                    password: '~!Q1q2w3e4r',
                }
            },
            {
                name: 'api/v1/users/bonus',
                method: 'POST',
                header: 'Bearer',
                data: {

                }
            },
        ]
    })

    const onChangeScenarioInfo = (e) => {
        setScenarioInfo({
            ...scenarioInfo,
            [e.target.name] : e.target.value,
        })
        console.log(scenarioInfo);
    }

    const startScenario = () =>{

        ipcRenderer.send('StartScenario',scenarioInfo);
    }

    return (
        <div>
            
            <input id="domainname" name="domainname" placeholder="http://naver.com" onFocus={onChangeScenarioInfo}/> <br></br>
            <input id="portname" name="portname" placeholder="8080" onFocus={onChangeScenarioInfo}/><br></br>
            <input type = "number" min = "1" max ="100" id="vusers" name = "vusers" onChange={onChangeScenarioInfo}/><br></br>
            <button onClick = {startScenario}>시나리오 시작</button>
        </div>
        //버튼 클릭하면 시나리오 시작
    );
}