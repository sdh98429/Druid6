import './App.css';
import { useEffect } from 'react';
import WorkerBuilder from './WorkerBuilder';
import myWorker from './myWorker';
import { useState } from 'react';

function App() {
  const [userUrl, setUserUrl] = useState('');
  const [userDuration, setUserDuration] = useState(1);
  const [userArrivalRate, setUserArrivalRate] = useState(0);
  const [userScenario, setUserScenario] = useState('');

  const userConfirm = function () {
    let instanceArr = []
    for (let i = 0; i < userArrivalRate; i++ ) {
      instanceArr[i] = new WorkerBuilder(myWorker);
      instanceArr[i].onmessage = (message) => {
        if (message) {
          console.log("Message from worker", message);
        }
      };
      instanceArr[i].postMessage({
        duration : 2,
        url: 'http://k6s2041.p.ssafy.io:8080/api/v1/users/login',
        method: "POST",
        body: {
          email: "test123@test.com",
          password: "a123123123"
        }
      })
    }

  } 

  // const postmessage = function () {
    // .postMessage({
    //   duration : 2,
    //   url: 'http://k6s2041.p.ssafy.io:8080/api/v1/users/login',
    //   method: "POST",
    //   body: {
    //     email: "test123@test.com",
    //     password: "a123123123"
    //   }
    // })
    
  // }

  return (
    <div className="App">
        <header className="App-header">
          <p>
            Web worker in React
          </p>
          <button onClick={() => userConfirm()}>보내기</button>
          <div>
            <input type="text" onChange={(e) => setUserUrl(e.target.value)}/>
            <p>URL값 : {userUrl}</p>
            <input type="number" onChange={(e) => setUserDuration(Number(e.target.value))}/>
            <p>Duration값: {userDuration}</p>
            <input type="number" onChange={(e) => setUserArrivalRate(Number(e.target.value))}/>
            <p>ArrivalRate값: {userArrivalRate}</p>
            <input type="text" onChange={(e) => setUserScenario(e.target.value)}/>
            <p>UserScenario값: {userScenario}</p>
          </div>
        </header>
      </div>
  );
}

export default App;
