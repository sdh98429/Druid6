import React, { useEffect, useState } from "react";
import "./WebPerformance.scss";
import requestWebPerformanceResult from "../../services/api/WebPerformance";
import Solutions from "./Solutions";
import { useDispatch } from "react-redux";
import { updateMenuTitle } from "../../redux/actions";

import ScoreChart from "./ScoreChart";
import Screenshot from "./Screenshot";
import { Button } from "@mui/material";
import { TextField } from "@mui/material";
import { IconButton } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

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
  // url input값 가져오기
  //input에서 value를 담기 위한 state 생성
  const [url, setUrl] = useState("");

  //input에 입력될 때마다 account state값 변경되게 하는 함수
  const onChangeUrl = (e) => {
    setUrl(e.target.value);
  };

  // api 요청값 저장할 state 생성
  const [performanceReport, setPerformanceReport] = useState(
    initialPerformanceReport
  );

  const [displaySolutions, setDisplaySolutions] = useState(false);

  const [desktopData, setDesktopData] = useState("");

  // api 요청값 저장할 state 생성
  const [mobileData, setMobileData] = useState("");
  const [displayData, setDisplayData] = useState("");

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
      setPerformanceReport(parseSpeedData(mobileData));
      setDisplayData(mobileData);
    }
  }, [mobileData]);

  useEffect(() => {
    if (desktopData) {
      setPerformanceReport(parseSpeedData(desktopData));
      setDisplayData(desktopData);
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
        setPerformanceReport(parseSpeedData(desktopData));
        setDisplayData(desktopData);
      } else if (displayDataName === "displayMobile") {
        setPerformanceReport(parseSpeedData(mobileData));
        setDisplayData(mobileData);
      }
    }
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
            {/* <Input
              type="text"
              id="url"
              name="url"
              placeholder="Enter web page URL"
              onChange={onChangeUrl}
              className="searchbar-input"
            ></Input> */}
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
                onClick={() => setDisplaySolutions(false)}
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
                onClick={() => setDisplaySolutions(true)}
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
