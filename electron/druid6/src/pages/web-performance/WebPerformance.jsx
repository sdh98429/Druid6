import React, { useEffect, useState } from "react";
import "./WebPerformance.scss";
import requestWebPerformanceResult from "../../services/api/WebPerformance";
import Solutions from "./Solutions";
import NoUrl from "./NoUrl";

// redux
import ButtonToOtherPages from "./ButtonToOtherPages";
import { useSelector } from "react-redux";

import ScoreChart from "./ScoreChart";
import Screenshot from "./Screenshot";
import { Button } from "@mui/material";
import { TextField } from "@mui/material";
import { IconButton } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

// icon
import menuTitleArrow from "../../static/images/menu-title-arrow.svg";

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

  const [tagSelected, setTagSelected] = useState(1);

  useEffect(() => {
    if (mobileData) {
      setPerformanceState({
        ...performanceState,
        performanceReport: parseSpeedData(mobileData),
        displayData: mobileData,
      });
    }
    console.log(mobileData);
  }, [mobileData]);

  useEffect(() => {
    if (desktopData) {
      setPerformanceState({
        ...performanceState,
        performanceReport: parseSpeedData(desktopData),
        displayData: desktopData,
      });
    }
    console.log(desktopData);
  }, [desktopData]);

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

  const handleKeyUp = (e) => {
    if (e.key === "Enter") {
      drawWebPerformanceResult();
    }
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

  // redux
  const {
    naverMobileData,
    naverDesktopData,
    googleMobileData,
    googleDesktopData,
    bingMobileData,
    bingDesktopData,
    daumMobileData,
    daumDesktopData,
  } = useSelector((state) => ({
    naverMobileData: state.naverMobileData,
    naverDesktopData: state.naverDesktopData,
    googleMobileData: state.googleMobileData,
    googleDesktopData: state.googleDesktopData,
    bingMobileData: state.bingMobileData,
    bingDesktopData: state.bingDesktopData,
    daumMobileData: state.daumMobileData,
    daumDesktopData: state.daumDesktopData,
  }));

  const viewOtherPage = (name) => {
    if (name === "naver") {
      setPerformanceState({
        ...performanceState,
        mobileData: naverMobileData,
        desktopData: naverDesktopData,
      });
    } else if (name === "google") {
      setPerformanceState({
        ...performanceState,
        mobileData: googleMobileData,
        desktopData: googleDesktopData,
      });
    } else if (name === "bing") {
      setPerformanceState({
        ...performanceState,
        mobileData: bingMobileData,
        desktopData: bingDesktopData,
      });
    } else if (name === "daum") {
      setPerformanceState({
        ...performanceState,
        mobileData: daumMobileData,
        desktopData: daumDesktopData,
      });
    }
  };

  return (
    <div className="WebPerformance">
      <div className="header-area">
        <img className="tag-img" src={menuTitleArrow} alt="" />
        <div
          className={"tag-area " + (tagSelected === 1 && "tag-selected")}
          onClick={() => setTagSelected(1)}
        >
          웹 퍼포먼스
        </div>
        <span className="spacer"></span>
        <img className="tag-img" src={menuTitleArrow} alt="" />
        <div
          className={"tag-area " + (tagSelected === 2 && "tag-selected")}
          onClick={() => setTagSelected(2)}
        >
          다른사이트와 비교
        </div>
      </div>
      {tagSelected === 1 ? (
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
            <div className="searchbar" style={{ marginTop: "10px" }}>
              <TextField
                className="searchbar-input"
                size="small"
                id="url"
                label="URL"
                variant="outlined"
                name="url"
                placeholder="Enter web page URL"
                onChange={onChangeUrl}
                onKeyUp={handleKeyUp}
              />
              <Button
                className="searchbar-btn"
                variant="contained"
                onClick={drawWebPerformanceResult}
              >
                분석
              </Button>
            </div>
            {!displayData ? (
              <NoUrl />
            ) : displaySolutions ? (
              <div className="container-tosolution-result">
                <IconButton
                  className="btn-toresult"
                  disabled={!displaySolutions}
                  onClick={() => goTo("result")}
                >
                  <ArrowBackIosNewIcon></ArrowBackIosNewIcon>
                </IconButton>
                <div className="table-solutions badge solutions-badge">
                  <Solutions mobileData={displayData}></Solutions>
                </div>
              </div>
            ) : (
              <div className="api-result">
                <div className="api-graph">
                  <div className="api-score badge no-hover">
                    <ScoreChart
                      performanceScore={performanceScore}
                      Color={Color}
                    />
                  </div>
                  <div className="final-image badge no-hover">
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
      ) : (
        <div className="CompareWithOtherPages">
          <div className="center">
            <ButtonToOtherPages pageName={"내 웹"} />
          </div>
          <div className="left-top" onClick={() => viewOtherPage("google")}>
            <ButtonToOtherPages pageName={"구글"} />
          </div>
          <div className="left-bottom" onClick={() => viewOtherPage("naver")}>
            <ButtonToOtherPages pageName={"네이버"} />
          </div>
          <div className="right-top" onClick={() => viewOtherPage("daum")}>
            <ButtonToOtherPages pageName={"다음"} />
          </div>
          <div className="right-bottom" onClick={() => viewOtherPage("bing")}>
            <ButtonToOtherPages pageName={"빙"} />
          </div>
        </div>
      )}
    </div>
  );
}
