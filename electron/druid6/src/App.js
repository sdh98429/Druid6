import logo from './logo.svg';
import './App.css';
import {useState} from 'react';

function App() {
  const {ipcRenderer} =window.require("electron");
  const sendMain = () => {
    ipcRenderer.send("SEND_MAIN_PING", 'send what');
  }
  const [m,sm] = useState('aa');
  ipcRenderer.on("reply",(event,arg)=>{
    console.log('asd?');
    sm(arg);
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
      </header>
    </div>
  );
}

export default App;
