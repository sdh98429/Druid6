import { useState } from "react";
// worker javascript files
import myWorker from "./web-worker/myWorker"
import WorkerBuilder from "./web-worker/WorkerBuilder"

export default function StressTest() {

  const [scenarioInfo, setScenarioInfo] = useState({
    vusers: 1,
    flows: [
      {
        url: "http://k6s2041.p.ssafy.io:8080/api/v1/users/login",
        method: "POST",
        token: "",
        useResponse: ['accessToken'],
        body: {
          email: "test1@test.com",
          password: "~!Q1q2w3e4r",
        },
      },
      {
        url: "http://k6s2041.p.ssafy.io:8080/api/v1/users/bonus",
        method: "POST",
        token: "$.accessToken",
        useResponse: [],
      },
    ],
  });

  const onChangeScenarioInfo = (e) => {
    setScenarioInfo((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      }
    });
  };

  let WorkerArr = []
  const responseStatus = {
    '1' : 0,
    '2' : 0,
    '3' : 0,
    '4' : 0,
    '5' : 0,
  }
  const startScenario = async function () {
    const startTime = Date.now()
    for (let i = 0; i < scenarioInfo.vusers; i++ ) {
      WorkerArr[i] = new WorkerBuilder(myWorker);
      WorkerArr[i].onmessage = (message) => {
        if (message.data === "work end"){
          WorkerArr.pop()
          if (WorkerArr.length === 0){
            // TODO : worker가 모두 일을 끝낼을때 무엇을 할지 
            console.log(responseStatus)
            console.log(Date.now() - startTime)
          }
        }
        else {
          responseStatus[(message.data+'')[0]] += 1
        }
      };
      WorkerArr[i].postMessage(scenarioInfo.flows)
    }
  }
  const checkStatus = () => {
    console.log(responseStatus)
  } 

  return (
    <div>
      <input
        type="number"
        min="1"
        max="100"
        id="vusers"
        name="vusers"
        onChange={onChangeScenarioInfo}
      />
      <button onClick={startScenario}>시나리오 시작</button>
      <button onClick={checkStatus}>status check</button>
    </div>
    //버튼 클릭하면 시나리오 시작
  );
}
