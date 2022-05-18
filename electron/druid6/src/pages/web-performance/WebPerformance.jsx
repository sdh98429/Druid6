import React, { useEffect, useState } from "react";
import "./WebPerformance.scss";
import requestWebPerformanceResult from "../../services/api/WebPerformance";
import Solutions from "./Solutions";

import ScoreChart from "./ScoreChart";
import Screenshot from "./Screenshot";
import { Button } from "@mui/material";
import { TextField } from "@mui/material";
import { IconButton } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import ResultContents from "./ResultContents";

const initialState = {
  performanceReport: {
    FCP: "",
    SI: "",
    LCP: "",
    TTI: "",
    TBT: "",
    CLS: "",
    screenshot: "",
    performanceScore: 0,
  },
  displaySolutions: false,
  desktopData: "",
  mobileData: "",
  displayData: "",
  url: "",
};

export default function WebPerformance() {
  const [performanceState, setPerformanceState] = useState(initialState);
  // api 요청값 저장할 state 생성
  const {
    performanceReport,
    displaySolutions,
    desktopData,
    mobileData,
    displayData,
    url,
  } = performanceState;

  //input에 입력될 때마다 account state값 변경되게 하는 함수
  const onChangeUrl = (e) => {
    setPerformanceState({ ...performanceState, url: e.target.value });
  };

  const handleClickDetermineWebPerformance = async () => {
    console.log(`hi`);

    // 병렬처리
    const getMobileResult = requestWebPerformanceResult(url, "MOBILE");
    const getDesktopResult = requestWebPerformanceResult(url, "DESKTOP");

    const mobileResult = await getMobileResult;
    const desktopResult = await getDesktopResult;

    setPerformanceState({
      ...performanceState,
      mobileData: mobileResult,
      desktopData: desktopResult,
    });
  };

  const drawWebPerformanceResult = async () => {
    await handleClickDetermineWebPerformance();
  };

  const parseSpeedData = (arrivedData) => {
    const performanceReport = {};

    const audit = arrivedData.data.lighthouseResult.audits;

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
      setPerformanceState({
        ...performanceState,
        performanceReport: parseSpeedData(mobileData),
        displayData: mobileData,
      });
    }
  }, [mobileData]);

  useEffect(() => {
    if (desktopData) {
      setPerformanceState({
        ...performanceState,
        performanceReport: parseSpeedData(desktopData),
        displayData: desktopData,
      });
    }
  }, [desktopData]);

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

  const changeDisplayData = (displayDataName) => {
    if (mobileData && desktopData) {
      if (displayDataName === "displayDesktop") {
        setPerformanceState({
          ...performanceState,
          performanceReport: parseSpeedData(desktopData),
          displayData: desktopData,
        });
      } else if (displayDataName === "displayMobile") {
        setPerformanceState({
          ...performanceState,
          performanceReport: parseSpeedData(mobileData),
          displayData: mobileData,
        });
      }
    }
  };

  const goTo = (path) => {
    let displaySolutions = false;
    if (path === "result") {
      displaySolutions = false;
    } else if (path === "solutions") {
      displaySolutions = true;
    }
    setPerformanceState({
      ...performanceState,
      displaySolutions,
    });
  };

  return (
    <div className="WebPerformance">
      <div className="tab">탭</div>
      <div className="container-btn-result">
        <div className="container-desktop-mobile">
          <Button
            variant="text"
            className="btn-desktop"
            onClick={() => changeDisplayData("displayDesktop")}
          >
            <span>Desktop</span>
          </Button>
          <Button
            variant="text"
            className="btn-mobile"
            onClick={() => changeDisplayData("displayMobile")}
          >
            <span>Mobile</span>
          </Button>
        </div>
        <div className="container-search-tosolution-result">
          <div className="searchbar">
            <TextField
              className="searchbar-input"
              id="url"
              label="URL"
              variant="outlined"
              name="url"
              placeholder="Enter web page URL"
              onChange={onChangeUrl}
            />
            <Button
              className="searchbar-btn"
              variant="contained"
              onClick={drawWebPerformanceResult}
            >
              분석
            </Button>
          </div>

          {displaySolutions ? (
            <div className="container-tosolution-result">
              <IconButton
                className="btn-toresult"
                disabled={!displaySolutions}
                onClick={() => goTo("result")}
              >
                <ArrowBackIosNewIcon></ArrowBackIosNewIcon>
              </IconButton>
              <div className="table-solutions badge">
                <Solutions mobileData={displayData}></Solutions>
              </div>
            </div>
          ) : (
            <div className="api-result">
              <div className="api-graph">
                <div className="api-score">
                  <ScoreChart
                    performanceScore={performanceScore}
                    Color={Color}
                  />
                </div>
                <div className="final-image">
                  <Screenshot screenshot={screenshot} />
                </div>
              </div>
              <ResultContents performanceReport={performanceReport} />
              <IconButton
                className="btn-toresult"
                disabled={displaySolutions}
                onClick={() => goTo("solutions")}
              >
                <ArrowForwardIosIcon></ArrowForwardIosIcon>
              </IconButton>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
