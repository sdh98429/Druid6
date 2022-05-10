import logo from './logo.svg';
import './App.css';
import {useState} from 'react';
import WorkerBuilder from './WorkerBuilder';
import myWorker from './myWorker'



function App() {
  const {ipcRenderer} = window.require("electron");
  const sendMain = () => {
    ipcRenderer.send("SEND_MAIN_PING", 'send what');
  }
  const [m,sm] = useState('aa');
  ipcRenderer.on("reply",(event,arg)=>{
    console.log('asd?');
    sm(arg);
  })

  const workerRun = async () => {
    const startTime = Date.now()
    let user_inputs = 1300;
    const worker_length = parseInt(user_inputs/10) + 1;
    const worker_arr = []
    for (let j = 0; j< worker_length; j++) {
      worker_arr[j] = new WorkerBuilder(myWorker);
      worker_arr[j].onmessage = (message) => {
        if (message.data === "work end"){
          worker_arr.pop()
          if (worker_arr.length === 0){
            const endTime = Date.now()
            console.log(endTime - startTime);
          }
        }
        else {
          console.log("Message from worker", message);
        }
      }
      worker_arr[j].postMessage({
        circulation: j === worker_length-1 ? user_inputs % 10 : 10,
        url: 'http://k6s2041.p.ssafy.io:8080/api/v1/users/login',
        method: "POST",
        body: {
          email: "test123@test.com",
          password: "a123123123"
        }
      })
    }

  }

  ipcRenderer.on("workerDone", (event, arg) => {
    console.log('hi')
    sm('hi');
  })
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <div id='text-box'>{m}</div>
        <button onClick={sendMain}>Send Mail</button> 
        <button onClick={() => workerRun()}>Worker run</button> 
      </header>
    </div>
  );
}

export default App;
