import './WebPerformance.css';
import requestWebPerformanceResult from './services/api/WebPerformance';
import * as React from 'react';


export default function WebPerformance() {

  // url input값 가져오기
  //input에서 value를 담기 위한 state 생성 
  const [url, setUrl] = React.useState(""); 
  
  //input에 입력될 때마다 account state값 변경되게 하는 함수 
  const onChangeUrl = (e) => { setUrl(e.target.value); };


  // api 요청값 저장하기 
  const [mobile, setMobile] = React.useState(0);

  const handleChangeMobile = (event, newValue) => {
    setMobile(newValue);
  };

  const [desktop, setDesktop] = React.useState(0);

  const handleChangeDesktop = (event, newValue) => {
    setDesktop(newValue);
  };


  const handleClickDetermineWebPerformance = async () => {
    console.log(`hi`);

    const mobileResult = await requestWebPerformanceResult(url, 'MOBILE');
    console.log(`hi im mobile, ${JSON.stringify(mobileResult)}`);
    handleChangeMobile(mobileResult);
    console.log('모바일~~' + mobile);
    
    const desktopResult = await requestWebPerformanceResult(url, 'DESKTOP');
    console.log(`hi im desktop, ${JSON.stringify(desktopResult)}`);
    handleChangeMobile(desktopResult);
    console.log('데스크탑~!' + desktop);
        
  };

  return (
    <div className='App'>
      <div>
        <label>분석할 사이트 url : </label>
        <input type='text' id='url' name='url' placeholder='웹페이지 URL 입력' onChange={onChangeUrl}></input>
      </div>
      <div>
        <button onClick={handleClickDetermineWebPerformance}>성능 측정하기</button>
      </div>
    </div>
  );
}


// import {useState} from 'react';

// function Pagespeed() {
//   const {ipcRenderer} =window.require("electron");
//   const sendMain = () => {
//     ipcRenderer.send("SEND_MAIN_PING", 'send what');
//   }
//   const [cpuUsage,setCpuUsage] = useState('');
//   ipcRenderer.on("reply",(event,arg)=>{
//     console.log('asd?');
//     setCpuUsage(arg);
//   })
  
  
//   return (
//     <div className="App">
//       <header className="App-header">
//         <p>
//           Edit <code>src/Pagespeed.js</code> and save to reload.
//         </p>
//         <div id='text-box'>{cpuUsage}</div>
//         <button onClick={sendMain}>send request</button> 
//       </header>
//     </div>
//   );
// }

// export default Pagespeed;
