import React, { useEffect, useState } from "react";
import "./WebPerformance.scss";

// component
import requestWebPerformanceResult from "../../services/api/WebPerformance";
import Solutions from "./Solutions";
import NoUrl from "./NoUrl";
import ButtonToOtherPages from "./ButtonToOtherPages";
import BodyBlackoutStyle from "../../components/BodyBlackoutStyle";
import ScoreChart from "./ScoreChart";
import Screenshot from "./Screenshot";
import ResultContents from "./ResultContents";

// redux
import { useSelector, useDispatch } from "react-redux";
import {
  updateMyPageMobileData,
  updateMyPageDesktopData,
} from "../../redux/actions";

// mui icon
import { Button } from "@mui/material";
import { TextField } from "@mui/material";
import { IconButton } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import menuTitleArrow from "../../static/images/menu-title-arrow.svg";

// 초기 state값 지정
const initialState = {
  performanceReport: {
    FCP: "", // 점수 판단에 사용되는 핵심 6개 값
    SI: "",
    LCP: "",
    TTI: "",
    TBT: "",
    CLS: "",
    screenshot: "", // 메인페이지 스크린샷
    performanceScore: 0, // 최종 점수
  },
  displaySolutions: false, // 탭에서 솔루션을 보여주는지, false인 경우 점수 화면을 보여줌
  desktopData: "", // pagespeed에서 받아온 데스크톱 접속시 json 테스트 결과
  mobileData: "", // pagespeed에서 받아온 모바일 접속시 json 테스트 결과
  displayData: "", // 현재 화면에서 보여주는 데이터 값 (desktopData or mobileData)
  isMyPage: false, // 현재 보고 있는게 내가 입력한 url로 보는 페이지 결과값인지, false인 경우 '다른 사이트와 비교'에서 클릭하여 구글, 네이버, 빙 등을 보고 있는 경우
  isLoading: false, // 현재 url 요청을 보내고 api 응답값을 기다리고 있는 중인지
  url: "", // 사용자가 요청한 url 주소
};

export default function WebPerformance() {
  const dispatch = useDispatch();
  const [performanceState, setPerformanceState] = useState(initialState); // webperformance 모든 상태값 저장된 performanceState
  // api 요청값 저장할 state 생성
  const {
    performanceReport,
    displaySolutions,
    desktopData,
    mobileData,
    displayData,
    isMyPage,
    isLoading,
    url,
  } = performanceState;

  const [tagSelected, setTagSelected] = useState(1); // 선택한 태그값

  // 모바일 데이터가 바뀐 경우
  useEffect(() => {
    if (mobileData) {
      setPerformanceState({
        ...performanceState,
        performanceReport: parseSpeedData(mobileData), // 파싱한 모바일 데이터 저장
        displayData: mobileData, // 현재 보여주는 데이터 모바일 데이터로
      });
      if (isMyPage) { // 만약 내 웹 페이지 입력했다면
        dispatch(updateMyPageMobileData(mobileData)); // 리덕스의 mobileData에 현재 모바일 데이터 저장
      }
    }
  }, [mobileData]);

  // 데스크톱 데이터가 바뀐 경우
  useEffect(() => {
    if (desktopData) {
      setPerformanceState({
        ...performanceState,
        performanceReport: parseSpeedData(desktopData), // 파싱한 데스크톱 데이터 저장
        displayData: desktopData, // 현재 보여주는 데이터 데스크톱 데이터로
      });
      if (isMyPage) { // 만약 내 웹 페이지 입력했다면
        dispatch(updateMyPageDesktopData(desktopData)); // 리덕스의 desktopData에 현재 데스크톱 데이터 저장
      }
    }
  }, [desktopData]);

  //input에 입력될 때마다 account state값 변경되게 하는 함수
  const onChangeUrl = (e) => {
    setPerformanceState({ ...performanceState, url: e.target.value });
  };


  // url 입력하고 분석 버튼 누르거나 엔터를 누른 경우
  const handleClickDetermineWebPerformance = async () => {

    // 병렬처리
    const getMobileResult = requestWebPerformanceResult(url, "MOBILE");
    const getDesktopResult = requestWebPerformanceResult(url, "DESKTOP");

    const mobileResult = await getMobileResult;
    const desktopResult = await getDesktopResult;

    setPerformanceState({
      ...performanceState,
      isMyPage: true, // 내 웹 페이지를 보는 중
      mobileData: mobileResult, // 모바일 데이터에 api 응답값 저장
      desktopData: desktopResult, // 데스크톱 데이터에 api 응답값 저장
    });
  };

  // url 입력하고 분석 버튼 누르거나 엔터를 누른 경우 로딩창 생성
  const drawWebPerformanceResult = async () => {
    setPerformanceState({
      ...performanceState,
      isLoading: true, // 로딩창 생성
    });
    await handleClickDetermineWebPerformance();
  };

  // 분석하기 버튼 대신 엔터로 입력한 경우
  const handleKeyUp = (e) => {
    if (e.key === "Enter") {
      drawWebPerformanceResult();
    }
  };

  // speedpage api 응답값 파싱
  const parseSpeedData = (arrivedData) => {
    const performanceReport = {};

    const audit = arrivedData.data.lighthouseResult.audits;

    performanceReport["FCP"] = audit["first-contentful-paint"];
    performanceReport["SI"] = audit["speed-index"];
    performanceReport["LCP"] = audit["largest-contentful-paint"];
    performanceReport["TTI"] = audit["interactive"];
    performanceReport["TBT"] = audit["total-blocking-time"];
    performanceReport["CLS"] = audit["cumulative-layout-shift"];

    performanceReport["performanceScore"] = parseInt( // 점수 계산 로직
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

  // 퍼포먼스 점수에 따라 글자 색 변경
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

  // 퍼포먼스 점수에 따라 글자색 변경
  const Color = changeColor();

  // 현재 보여주는 데이터값 변경
  const changeDisplayData = (displayDataName) => {
    if (mobileData && desktopData) {
      if (displayDataName === "displayDesktop") { // 데스크톱 데이터 보여줌
        setPerformanceState({
          ...performanceState,
          performanceReport: parseSpeedData(desktopData),
          displayData: desktopData,
        });
      } else if (displayDataName === "displayMobile") { // 모바일 데이터 보여줌
        setPerformanceState({
          ...performanceState,
          performanceReport: parseSpeedData(mobileData),
          displayData: mobileData,
        });
      }
    }
  };

  // 보여주는 데이터값 점수 결과값 or 솔루션 변경
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
    myPageMobileData,
    myPageDesktopData,
  } = useSelector((state) => ({
    naverMobileData: state.naverMobileData,
    naverDesktopData: state.naverDesktopData,
    googleMobileData: state.googleMobileData,
    googleDesktopData: state.googleDesktopData,
    bingMobileData: state.bingMobileData,
    bingDesktopData: state.bingDesktopData,
    daumMobileData: state.daumMobileData,
    daumDesktopData: state.daumDesktopData,
    myPageMobileData: state.myPageMobileData,
    myPageDesktopData: state.myPageDesktopData,
  }));


  // 다른 웹 사이트 결과 보여주기
  const viewOtherPage = (name) => {
    if (name === "naver") {
      setPerformanceState({
        ...performanceState,
        mobileData: naverMobileData,
        desktopData: naverDesktopData,
        isMyPage: false,
      });
    } else if (name === "google") {
      setPerformanceState({
        ...performanceState,
        mobileData: googleMobileData,
        desktopData: googleDesktopData,
        isMyPage: false,
      });
    } else if (name === "bing") {
      setPerformanceState({
        ...performanceState,
        mobileData: bingMobileData,
        desktopData: bingDesktopData,
        isMyPage: false,
      });
    } else if (name === "daum") {
      setPerformanceState({
        ...performanceState,
        mobileData: daumMobileData,
        desktopData: daumDesktopData,
        isMyPage: false,
      });
    } else if (name === "myPage") {
      if (myPageMobileData && myPageDesktopData) {
        setPerformanceState({
          ...performanceState,
          mobileData: myPageMobileData,
          desktopData: myPageDesktopData,
          isMyPage: false,
        });
      }
    }
    setTagSelected(1);
  };

  return (
    <div className="WebPerformance">
      <div className="header-area">
        <img className="tag-img" src={menuTitleArrow} alt="" />
        <div
          className={"tag-area " + (tagSelected === 1 && "tag-selected")}
          onClick={() => setTagSelected(1)}
        >
          내 웹 퍼포먼스
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
          <div className="center" onClick={() => viewOtherPage("myPage")}>
            <ButtonToOtherPages pageName={"myPage"} />
          </div>
          <div className="left-top" onClick={() => viewOtherPage("google")}>
            <ButtonToOtherPages pageName={"google"} />
          </div>
          <div className="left-bottom" onClick={() => viewOtherPage("naver")}>
            <ButtonToOtherPages pageName={"naver"} />
          </div>
          <div className="right-top" onClick={() => viewOtherPage("daum")}>
            <ButtonToOtherPages pageName={"daum"} />
          </div>
          <div className="right-bottom" onClick={() => viewOtherPage("bing")}>
            <ButtonToOtherPages pageName={"bing"} />
          </div>
        </div>
      )}
      {isLoading && <BodyBlackoutStyle />}
    </div>
  );
}
