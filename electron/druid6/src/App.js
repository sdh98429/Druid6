import logo from './logo.svg';
import './App.css';


function App() {
  const {ipcRenderer} =window.require("electron");
  const sendMain = () => {
    ipcRenderer.send("SEND_MAIN_PING", 'send');
  }
  
 
  
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
        <div id='text-box'></div>
        <button onClick={sendMain}>Send Mail</button> 
      </header>
    </div>
  );
}

export default App;
