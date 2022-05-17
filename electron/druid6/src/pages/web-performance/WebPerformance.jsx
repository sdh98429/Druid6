import "./WebPerformance.scss";
import requestWebPerformanceResult from "../../services/api/WebPerformance";
import Solutions from "./Solutions";
import React, { useEffect, useState } from "react";

import ResultContents from "./ResultContents";
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

export default function WebPerformance() {
  const [displaySolutions, setDisplaySolutions] = useState(false);

  const [performanceReport, setPerformanceReport] = useState(
    initialPerformanceReport
  );

  // url input값 가져오기
  //input에서 value를 담기 위한 state 생성
  const [url, setUrl] = useState("");
  const [desktopData, setDesktopData] = useState("");

  // api 요청값 저장할 state 생성
  const [mobileData, setMobileData] = useState("");

  //input에 입력될 때마다 account state값 변경되게 하는 함수
  const onChangeUrl = (e) => {
    setUrl(e.target.value);
  };

  const handleClickDetermineWebPerformance = async () => {
    console.log(`hi`);

    // 병렬처리
    const getMobileResult = requestWebPerformanceResult(url, "MOBILE");
    const getDesktopResult = requestWebPerformanceResult(url, "DESKTOP");

    const mobileResult = await getMobileResult;
    const desktopResult = await getDesktopResult;

    setMobileData(mobileResult);
    setDesktopData(desktopResult);
  };

  const drawWebPerformanceResult = async () => {
    await handleClickDetermineWebPerformance();
  };

  const checkMobile = () => {
    const performanceReport = {};

    const audit = mobileData.data.lighthouseResult.audits;

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

    return performanceReport;
  };

  useEffect(() => {
    if (mobileData) {
      setPerformanceReport(checkMobile());
    }
  }, [mobileData]);

  const { screenshot, performanceScore } = performanceReport;

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

  return (
    <div className="WebPerformance">
      <div className="tab">탭</div>
      <div className="container-btn-result">
        <div className="container-desktop-mobile">
          <div className="btn-desktop">
            <span>Desktop</span>
          </div>
          <div className="btn-mobile">
            <span>Mobile</span>
          </div>
        </div>
        <div className="container-search-tosolution-result">
          <div className="searchbar">
            <input
              type="text"
              id="url"
              name="url"
              placeholder="웹페이지 URL 입력"
              onChange={onChangeUrl}
              className="searchbar-input"
            ></input>
            <button
              className="searchbar-btn"
              onClick={drawWebPerformanceResult}
            >
              분석
            </button>
          </div>

          {displaySolutions ? (
            <div className="container-tosolution-result">
              <div
                className="btn-toresult"
                disabled={!displaySolutions}
                onClick={() => setDisplaySolutions(false)}
              >
                <span>&lt;</span>
              </div>
              <div className="table-solutions badge">
                <Solutions mobileData={mobileData}></Solutions>
              </div>
            </div>
          ) : (
            <div>
              {/* 옮겼습니다 */}
              <div className="api-result">
                <div className="api-graph">
                  <div className="api-score">
                    <div
                      className="coreValueBody"
                      style={{ color: `${Color}` }}
                    >
                      {performanceScore}
                    </div>
                  </div>
                  <div className="final-image">
                    <img src={`${screenshot}`} alt="" />
                  </div>
                </div>
              </div>
              {/* 옮겼습니다 */}
              <ResultContents performanceReport={performanceReport} />
              <button
                disabled={displaySolutions}
                onClick={() => setDisplaySolutions(true)}
              >
                솔루션 페이지로 이동
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
