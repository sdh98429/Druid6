import React from 'react';
import WorkerBuilder from './WorkerBuilder';
import myWorker from './myWorker';
import { useState } from 'react';

export default function stressTest() {
  const [userUrl, setUserUrl] = useState('');
  const [userDuration, setUserDuration] = useState(1);
  const [userArrivalRate, setUserArrivalRate] = useState(0);
  const [userScenario, setUserScenario] = useState('');
  let instanceArr = []

  function sleep(ms) {
    return new Promise((r) => setTimeout(r, ms));
  }

  const testFinished = () => {
    // TODO : 테스트가 완료되었을때 어떤 작업을 할지 정리
    console.log('끝')
  }

  const startTest = async function () {
    for (let i = 0; i < userArrivalRate; i++ ) {
      if (i !== 0  && i % 250 === 0) {
        await sleep(9000)
      }
      instanceArr[i] = new WorkerBuilder(myWorker)
      instanceArr[i].onmessage = (message) => {
        if (message.data === "work end"){
          instanceArr.pop()
          if (instanceArr.length === 0){
            testFinished()
          }
        }
        else {
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

  const checkArr = function () {
    console.log(instanceArr)
  }

  return (
    <div className="App">
        <header className="App-header">
          <p>
            Web worker in React
          </p>
          <button onClick={() => startTest()}>보내기</button>
          <button onClick={() => checkArr()}>체크</button>
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