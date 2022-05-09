import logo from './logo.svg';
import './App.css';
import {useState} from 'react';
import FileUpload from './FileUpload.jsx';

function App() {
  const {ipcRenderer} =window.require("electron");
  const sendMain = () => {
    ipcRenderer.send("SEND_MAIN_PING", 'send what');
  }
  const [cpuUsage,setCpuUsage] = useState('');
  ipcRenderer.on("reply",(event,arg)=>{
    console.log('asd?');
    setCpuUsage(arg);
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
        <div id='text-box'>{cpuUsage}</div>
        <button onClick={sendMain}>Send Mail</button>
        <FileUpload />
      </header>
    </div>
  );
}

export default App;
