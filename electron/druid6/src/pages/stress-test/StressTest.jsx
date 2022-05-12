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
        url: "http://k6s2041.p.ssafy.io:8080/api/v1/users/bonus/",
        method: "POST",
        token: "$.accessToken",
        body: {
          email: '$.accessToken'
        }
      },
    ],
  });

  const onChangeScenarioInfo = (e) => {
    setScenarioInfo({
      ...scenarioInfo,
      [e.target.name]: e.target.value,
    });
    console.log(scenarioInfo);
  };

  let instanceArr = []
  const responseStatus = {
    '1' : 0,
    '2' : 0,
    '3' : 0,
    '4' : 0,
    '5' : 0,
  }
  const startScenario = async function () {
    for (let i = 0; i < scenarioInfo.vusers; i++ ) {
      instanceArr[i] = new WorkerBuilder(myWorker);
      instanceArr[i].onmessage = (message) => {
        if (message.data === "work end"){
          instanceArr.pop()
          if (instanceArr.length === 0){
            console.log(responseStatus)
          }
        }
        else {
          console.log(message)
          responseStatus[(message.data+'')[0]] += 1
        }
      };
      instanceArr[i].postMessage(scenarioInfo.flows)
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
