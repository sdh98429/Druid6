import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// redux
import { useDispatch, useSelector } from "react-redux";
import {
  updateStressTestScenarios,
  updateMenuTitle,
  updateResponseStatus,
  updateResponseLatencies,
  updateResponseVuserCount,
  updateResponseScenarioCount,
  clearStressTestInputs,
} from "../../redux/actions";
// scss
import "./StressTest.scss";
// components
import MySelect from "./components/MySelect";
import Tags from "./components/Tags";
import JsonTextArea from "./components/JsonTextArea";
import MyInput from "./components/MyInput";
import ScenarioArea from "./components/ScenarioArea";
import VusersArea from "./components/VusersArea";
import ResponseInputArea from "./components/ResponseInputArea";
import BodyBlackoutStyle from "../../components/BodyBlackoutStyle";
// mui
import Switch from "@mui/material/Switch";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

export default function StressTest() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { stressTestInputs } = useSelector((state) => ({
    stressTestInputs: state.stressTestInputs,
  }));
  const { stressTestScenarios } = useSelector((state) => ({
    stressTestScenarios: state.stressTestScenarios,
  }));
  const { vusers } = useSelector((state) => ({
    vusers: state.vusers,
  }));

  const [tagActivated, setTagActivated] = useState("body");
  const [useToken, setUseToken] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChangeUseToken = () => {
    setUseToken(!useToken);
  };

  useEffect(() => {
    dispatch(updateMenuTitle("시나리오 테스트"));
  }, []);

  // const [scenarioInfo, setScenarioInfo] = useState({
  //   vusers: 1,
  //   flows: [
  //     {
  //       url: "http://k6s2041.p.ssafy.io:8080/api/v1/users/login",
  //       method: "POST",
  //       token: "",
  //       savedResponse: ["accessToken"],
  //       body: {
  //         email: "test1@test.com",
  //         password: "~!Q1q2w3e4r",
  //       },
  //     },
  //     {
  //       url: "http://k6s2041.p.ssafy.io:8080/api/v1/users/bonus",
  //       method: "POST",
  //       token: "$.accessToken",
  //       savedResponse: [],
  //     },
  //   ],
  // });

  let WorkerArr = [];
  const responseStatus = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  };
  const responseLatencies = [];

  const startScenario = async function () {
    setIsLoading(true);
    const startTime = Date.now();
    for (let i = 0; i < vusers; i++) {
      WorkerArr[i] = new Worker(
        new URL("./web-worker/myWorker.js", import.meta.url)
      );
      WorkerArr[i].onmessage = (message) => {
        checkPostMessage(message, startTime);
      };
      WorkerArr[i].postMessage(stressTestScenarios);
    }
  };

  const checkPostMessage = (message, startTime) => {
    const [key, value] = Object.entries(message.data)[0];

    if (key === "workEnd") {
      // TODO : 워커 한명이 일을 끝냈을 때
      WorkerArr.pop();
      if (WorkerArr.length === 0) {
        // TODO : worker가 모두 일을 끝낼을때 무엇을 할지
        dispatch(updateResponseStatus(responseStatus));
        dispatch(updateResponseLatencies(responseLatencies));
        dispatch(updateResponseVuserCount(vusers));
        dispatch(updateResponseScenarioCount(stressTestScenarios.length));
        setIsLoading(false);
        navigate("/stress-test-result");
      }
    } else if (key === "latencySended") {
      // TODO: worker가 request를 완료할때마다 responseLatencies 배열에 추가해줘야 함.
      responseLatencies.push(value);
    } else {
      // 그것도 아닐 경우 받아올 postMessage가 status 하나밖에 없으므로 responseStatus 객체 값에 + 1을 해줌.
      responseStatus[(value + "")[0]] += 1;
    }
  };

  const handleClickTags = (msg) => {
    if (msg === "bodyTagClicked") {
      setTagActivated("body");
    } else if (msg === "responseTagClicked") {
      setTagActivated("response");
    }
  };

  const saveScenario = () => {
    if (!stressTestInputs.url) {
      alert("URL을 입력해주세요.");
    } else if (!stressTestInputs.scenarioTitle) {
      alert("시나리오명을 입력해주세요.");
    } else {
      dispatch(updateStressTestScenarios(stressTestInputs));
      dispatch(clearStressTestInputs());
    }
  };
  return (
    <div className="StressTest">
      <div className="stress-test-wrapper">
        <div className="left-side-wrapper">
          <div className="method-url-area">
            <MySelect />
            <MyInput
              width="calc(64vw - 317px)"
              title="URL"
              param="url"
              abled={true}
            />
          </div>
          <div className="tags-switch-area">
            <Tags
              handleClickTags={handleClickTags}
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
          <div className="main-area">
            {tagActivated === "body" ? <JsonTextArea /> : <ResponseInputArea />}
          </div>
          <div className="footer-area">
            <MyInput
              width="calc(40vw - 100px)"
              title="Bearer Token"
              param="token"
              abled={useToken}
            />
            <MyInput
              width="150px"
              title="Scenario Title"
              param="scenarioTitle"
              abled={true}
            />
            <Fab
              size="small"
              color="success"
              aria-label="add"
              onClick={() => saveScenario()}
              style={{ zIndex: "1" }}
            >
              <AddIcon />
            </Fab>
          </div>
        </div>
        <div className="right-side-wrapper">
          <div className="header-area">
            <VusersArea startScenario={startScenario} />
          </div>
          <div className="main-area">
            <ScenarioArea />
          </div>
        </div>
      </div>
      {isLoading && <BodyBlackoutStyle />}
    </div>
  );
}
