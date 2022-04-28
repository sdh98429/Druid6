import './App.css';
import { useEffect } from 'react';
import WorkerBuilder from './WorkerBuilder';
import myWorker from './myWorker';
import axios from 'axios'

const instance = new WorkerBuilder(myWorker);
const instance2 = new WorkerBuilder(myWorker);
const instance3 = new WorkerBuilder(myWorker);

function App() {
  useEffect(() => {
    // fetch("https://www.naver.com", {
    //       method: "POST",
    //       mode: 'no-cors',
    //       headers: {
    //         'Content-type': 'application/json'
    //       },
    //       body: JSON.stringify({
    //         email: "guswhddlf11@gmail.com",
    //         password: "a123123123"
    //       })
    //     })
    //     .then(function(response) {
    //         console.log(response);
    //     }).catch(function(error) {
    //         console.log(error);
    //     });
    instance.postMessage({
      duration : 2,
      url: 'http://localhost:8080/api/v1/users/login',
      method: "POST",
      body: {
        email: "guswhddlf11@gmail.com",
        password: "a123123123"
      }
    })
    instance2.postMessage({
      duration : 2,
      url: 'http://localhost:8080/api/v1/users/login',
      method: "POST",
      body: {
        email: "guswhddlf11@gmail.com",
        password: "a123123123"
      }
    })

    instance.onmessage = (message) => {
      if (message) {
        console.log("Message from worker", message);
      }
    };
    instance2.onmessage = (message) => {
      if (message) {
        console.log("Message from worker2", message);
      }
    };
    instance3.onmessage = (message) => {
      if (message) {
        console.log("Message from worker3", message);
      }
    };
  })

  return (
    <div className="App">
        <header className="App-header">
          <p>
            Web worker in React
          </p>
        </header>
      </div>
  );
}

export default App;
