import './WebPerformance.css';
import requestWebPerformanceResult from './services/api/WebPerformance';


export default function WebPerformance() {

  const handleClickDetermineWebPerformance = async (strategy) => {
    console.log(`hi`);
    const webPerformanceResult = await requestWebPerformanceResult('http://k6s2041.p.ssafy.io/', strategy);
    console.log(`hi im ${strategy}, ${JSON.stringify(webPerformanceResult)}`);
  };

  return (
    <div className='App'>
      <div>
        <button onClick={() => handleClickDetermineWebPerformance('DESKTOP')}>데스크탑 성능 측정하기</button>
        <button onClick={() => handleClickDetermineWebPerformance('MOBILE')}>모바일 성능 측정하기</button>
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
