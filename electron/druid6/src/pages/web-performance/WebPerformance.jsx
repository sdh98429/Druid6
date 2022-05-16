import "./WebPerformance.scss";
import requestWebPerformanceResult from "../../services/api/WebPerformance";
import Solutions from "./Solutions";
import React, { useEffect, useState } from "react";
import CoreValue from "./CoreValue";
import coreValues from "../../static/coreValues";

export default function WebPerformance() {
  // url input값 가져오기
  //input에서 value를 담기 위한 state 생성
  const [url, setUrl] = useState("");

  //input에 입력될 때마다 account state값 변경되게 하는 함수
  const onChangeUrl = (e) => {
    setUrl(e.target.value);
  };

  // api 요청값 저장할 state 생성
  const [mobile, setMobile] = useState("");

  const handleChangeMobile = (newValue) => {
    setMobile(newValue);
  };

  const [desktop, setDesktop] = useState("");

  const handleChangeDesktop = async (newValue) => {
    setDesktop(newValue);
  };

  // 솔루션 페이지로 이동 버튼 비활성화 조건
  const [disableButton, setDisableButton] = useState(true);

  const handleChangeDisableButton = (newValue) => {
    setDisableButton(newValue);
  };

  const handleClickDetermineWebPerformance = async () => {
    console.log(`hi`);

    // 병렬처리
    const getMobileResult = requestWebPerformanceResult(url, "MOBILE");
    const getDesktopResult = requestWebPerformanceResult(url, "DESKTOP");

    const mobileResult = await getMobileResult;
    const desktopResult = await getDesktopResult;

    handleChangeMobile(mobileResult);
    handleChangeDesktop(desktopResult);
  };

  const drawWebPerformanceResult = async () => {
    await handleClickDetermineWebPerformance();
  };

  const parsingMobileResult = () => {
    const parseMobile = JSON.parse(mobile);
  };

  const checkMobile = () => {
    const performanceReport = {};

    const audit = mobile.data.lighthouseResult.audits;

    performanceReport["FCP"] = audit["first-contentful-paint"];
    performanceReport["SI"] = audit["speed-index"];
    performanceReport["LCP"] = audit["largest-contentful-paint"];
    performanceReport["TTI"] = audit["interactive"];
    performanceReport["TBT"] = audit["total-blocking-time"];
    performanceReport["CLS"] = audit["cumulative-layout-shift"];

    performanceReport["performanceScore"] = parseInt(
      10 * audit["first-contentful-paint"].score +
        10 * audit["interactive"].score +
        25 * audit["speed-index"].score +
        10 * audit["total-blocking-time"].score +
        30 * audit["largest-contentful-paint"].score +
        15 * audit["cumulative-layout-shift"].score
    );

    performanceReport["screenshot"] = audit["final-screenshot"].details.data;

    // const hSI = <h1>{SI}</h1>

    return performanceReport;
  };

  const initialPerformanceReport = {
    FCP: "",
    SI: "",
    LCP: "",
    TTI: "",
    TBT: "",
    CLS: "",
    screenshot: "",
    performanceScore: 0,
  };
  const [performanceReport, setPerformanceReport] = useState(
    initialPerformanceReport
  );

  // const handleClickCheckMobile = () => {
  //   setPerformanceReport(checkMobile());
  // };

  useEffect(() => {
    if (mobile) {
      // console.log(typeof(mobile))
      // console.log("제발 되라우", mobile)
      // console.log("저녁각", mobile.data.lighthouseResult.categories.performance)
      setPerformanceReport(checkMobile());
      handleChangeDisableButton(false);
    }
  }, [mobile]);

  const { FCP, SI, LCP, TTI, TBT, CLS, screenshot, performanceScore } =
    performanceReport;

  const [coreValueDetail, setCoreValueDetail] = useState(
    "각 메트릭을 클릭하면 세부 설명을 볼 수 있습니다."
  );

  const handleChangeCoreValueDetail = (newValue) => {
    setCoreValueDetail(newValue);
  };

  const changeColor = () => {
    if (performanceScore) {
      if (performanceScore >= 90) {
        return "green";
      } else if (performanceScore >= 50) {
        return "orange";
      } else {
        return "red";
      }
    } else {
      return "black";
    }
  };

  const Color = changeColor();

  let displaySolutions = false;
  // 솔루션 페이지로 이동 버튼
  const moveToSolutions = () => {
    displaySolutions = true;
  };

  const handleClick = () => {
    console.log("click");
  };

  return (
    <div className="WebPerformance">
      <div>
        <input
          type="text"
          id="url"
          name="url"
          placeholder="웹페이지 URL 입력"
          onChange={onChangeUrl}
        ></input>
        <button onClick={drawWebPerformanceResult}>성능 측정하기</button>
        <button onClick={parsingMobileResult}>모바일 체크2</button>
      </div>

      <div className="api-result">
        <div className="api-graph">
          <div className="api-score">
            <div className="coreValueBody" style={{ color: `${Color}` }}>
              {performanceScore}
            </div>
          </div>
          <div className="final-image">
            <img src={`${screenshot}`} alt="" />
          </div>
        </div>
        <div className="api-detail">
          <div className="represent">
            <ul>
              {coreValues.map((coreValue) => {
                return (
                  <CoreValue
                    value={performanceReport[coreValue.value]}
                    valueTitle={coreValue.valueTitle}
                    valueDescription={coreValue.valueDescription}
                    handleClick={handleClick}
                  />
                );
              })}
            </ul>
          </div>
          <div className="description">
            <div></div>
            <div>{`${coreValueDetail}`}</div>
          </div>
        </div>
      </div>

      <div>
        <button disabled={displaySolutions} onClick={moveToSolutions}>
          솔루션 페이지로 이동
        </button>
        <Solutions
          displaySolutions={displaySolutions}
          mobile={mobile}
        ></Solutions>
      </div>
    </div>
  );
}
