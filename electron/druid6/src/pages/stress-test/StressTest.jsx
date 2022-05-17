import { useState } from "react";
// worker javascript files
import myWorker from "./web-worker/myWorker";
import WorkerBuilder from "./web-worker/WorkerBuilder";
// scss
import "./StressTest.scss";
// components
import UrlInput from "./components/UrlInput";
import Tags from "./components/Tags";
import JsonTextArea from "./components/JsonTextArea";
// mui
import Switch from "@mui/material/Switch";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { createTheme } from "@mui/material/styles";

export default function StressTest() {
  const [tagActivated, setTagActivated] = useState("body");
  const [useToken, setUseToken] = useState(false);
  const handleChangeUseToken = () => {
    setUseToken(!useToken);
  };
  const [scenarioInfo, setScenarioInfo] = useState({
    vusers: 1,
    flows: [
      {
        url: "http://k6s2041.p.ssafy.io:8080/api/v1/users/login",
        method: "POST",
        token: "",
        useResponse: ["accessToken"],
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

  let WorkerArr = [];
  const responseStatus = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  };
  const responseLatencies = [];
  let workDoneTime = 0;

  const startScenario = async function () {
    const startTime = Date.now();
    for (let i = 0; i < scenarioInfo.vusers; i++) {
      WorkerArr[i] = new WorkerBuilder(myWorker);

      WorkerArr[i].onmessage = (message) => {
        checkPostMessage(message, startTime);
      };

      WorkerArr[i].postMessage(scenarioInfo.flows);
    }
  };

  const checkPostMessage = (message, startTime) => {
    const [key, value] = Object.entries(message.data)[0];

    if (key === "workEnd") {
      // TODO : 워커 한명이 일을 끝냈을 때
      WorkerArr.pop();
      if (WorkerArr.length === 0) {
        // TODO : worker가 모두 일을 끝낼을때 무엇을 할지
        workDoneTime = Date.now() - startTime;
        console.log(responseStatus);
        console.log("workDoneTime = " + workDoneTime);
        console.log("responseLatencies = " + responseLatencies);
      }
    } else if (key === "latencySended") {
      // TODO: worker가 request를 완료할때마다 responseLatencies 배열에 추가해줘야 함.
      responseLatencies.push(value);
    } else {
      // 그것도 아닐 경우 받아올 postMessage가 status 하나밖에 없으므로 responseStatus 객체 값에 + 1을 해줌.
      responseStatus[(value + "")[0]] += 1;
    }
  };

  const handleClickChipTags = (msg) => {
    if (msg === "bodyTagClicked") {
      setTagActivated("body");
    } else if (msg === "responseTagClicked") {
      setTagActivated("response");
    }
  };

  const theme = createTheme({
    palette: {
      mygreen: {
        main: "#f44336",
      },
    },
  });

  return (
    <div className="StressTest">
      <div className="stress-test-wrapper">
        <div className="left-side-wrapper">
          <UrlInput />
          <div className="tags-switch-area">
            <Tags
              handleClickChipTags={handleClickChipTags}
              tagActivated={tagActivated}
            />
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    checked={useToken}
                    onChange={handleChangeUseToken}
                    inputProps={{ "aria-label": "controlled" }}
                    color="success"
                  />
                }
                label="Use Token"
              />
            </FormGroup>
          </div>
          <JsonTextArea />
        </div>
        <div className="right-side-wrapper"></div>
      </div>
    </div>
  );
}
