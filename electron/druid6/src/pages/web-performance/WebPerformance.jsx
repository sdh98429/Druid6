import './WebPerformance.css';
import requestWebPerformanceResult from '../../services/api/WebPerformance';
import React, { useEffect, useState } from 'react';

export default function WebPerformance() {
  // url input값 가져오기
  //input에서 value를 담기 위한 state 생성 
  const [url, setUrl] = useState(""); 
  
  //input에 입력될 때마다 account state값 변경되게 하는 함수 
  const onChangeUrl = (e) => { setUrl(e.target.value); };


  // api 요청값 저장할 state 생성
  const [mobile, setMobile] = useState("");

  const handleChangeMobile = (newValue) => {
    setMobile(newValue);
  };

  const [desktop, setDesktop] = useState("");

  const handleChangeDesktop = async (newValue) => {
    setDesktop(newValue);
  };

  // useEffect(() => {
  //   if (mobile){
  //     // console.log(typeof(mobile))
  //     // console.log("제발 되라우", mobile)
  //     // console.log("저녁각", mobile.data.lighthouseResult.categories.performance)
  //     setPerformanceReport(checkMobile());
  //   }
  // }, [mobile]);

  const handleClickDetermineWebPerformance = async () => {
    console.log(`hi`);

    // 병렬처리
    const getMobileResult = requestWebPerformanceResult(url, 'MOBILE');
    const getDesktopResult = requestWebPerformanceResult(url, 'DESKTOP');

    const mobileResult = await getMobileResult;
    const desktopResult = await getDesktopResult;
    
    handleChangeMobile(mobileResult);
    handleChangeDesktop(desktopResult);

  };


  const drawWebPerformanceResult = async () => {

    await handleClickDetermineWebPerformance();

  }
  
  const parsingMobileResult = () => {
    const parseMobile = JSON.parse(mobile)
    // console.log("파싱")
    // console.log(parseMobile)
  }

  // if (mobile){
  //   const SI = mobile.data.lighthouseResult.audit["speed-index"]
  // }

  // const anything = "any"

  const checkMobile = () => {
    const performanceReport = {};
    
    // const parseMobile = JSON.parse(mobile)
    // console.log(parseMobile.data.lighthouseResult.categories.performance)
    const audit = mobile.data.lighthouseResult.audits
    // console.log("체크 버튼 클릭", mobile.data.lighthouseResult.audits)
    // console.log("First Contentful Paint")
    // console.log(audit["first-contentful-paint"].displayValue)
    // console.log(audit["first-contentful-paint"].numericValue + " " + audit["first-contentful-paint"].numericUnit)
    const div01 = document.getElementById("SI")

    performanceReport['FCP'] = audit["first-contentful-paint"]
    performanceReport['SI'] = audit["speed-index"]
    performanceReport['LCP'] = audit["largest-contentful-paint"]
    performanceReport['TTI'] = audit["interactive"]
    performanceReport['TBT'] = audit["total-blocking-time"]
    performanceReport['CLS'] = audit["cumulative-layout-shift"]

    // const hSI = <h1>{SI}</h1>

    return performanceReport;
  }

  const initialPerformanceReport = {
    'FCP': '',
    'SI': '',
    'LCP': '',
    'TTI': '',
    'TBT': '',
    'CLS': '',
  }
  const [ performanceReport, setPerformanceReport ] = useState(initialPerformanceReport);


  // const handleClickCheckMobile = () => {
  //   setPerformanceReport(checkMobile());
  // };

  const checkMobileInfo = () => {

    // 파싱
    console.log("----------------------------------------");
    console.log(JSON.stringify(mobile));
    const audits = mobile.data.lighthouseResult.audits
    
    console.log("First Contentful Paint (3G) : ", audits["first-contentful-paint-3g"].displayValue);
    console.log("자바스크립트 실행 시간 : ", audits["mainthread-work-breakdown"].displayValue); // 분석 할 때마다 값 차이가 난다
    console.log("중요한 요청을 미리 로드하기 : ", audits["uses-rel-preload"]); // 흰 빈칸, 시간 없음
    console.log("자바스크립트 번들에서 중복 모듈 삭제 : ", audits["duplicated-javascript"].numericValue); // 0
    console.log("스크롤 성능 개선에 패시브 리스너 사용 : ", audits["uses-passive-event-listeners"]); // 초록 칸, 시간 없음
    console.log("(진단) 긴 기본 스레드 작업 피하기 : ", audits["long-tasks"]); // 숫자 없음, 목록 나열
    console.log("대규모 네트워크 페이로드 방지하기 : ", audits["total-byte-weight"].displayValue);
    console.log("unload 이벤트 리스너를 사용하지 않음 : ", audits["no-unload-listeners"]); // 숫자 없음
    console.log("??? : ", audits["performance-budget"]); // 요청 수는 낮게, 전송 크기는 작게 유지하기 와 관련
    console.log("사용하지 않는 CSS 줄이기 : ", audits["unused-css-rules"].displayValue);
    console.log("대규모 레이아웃 변경 피하기 : ", audits["layout-shift-elements"]); // 흰 빈칸, 시간 없음
    
    console.log("사용하지 않는 자바스크립트 줄이기 숫자 : ", audits["unused-javascript"].numericValue);
    console.log("사용하지 않는 자바스크립트 줄이기 단위 : ", audits["unused-javascript"].numericUnit);
    
    console.log("텍스트 압축 사용 예상 절감치 숫자: ", audits["uses-text-compression"].numericValue);
    console.log("텍스트 압축 사용 예상 절감치 단위: ", audits["uses-text-compression"].numericUnit);

    console.log("렌더링 차단 리소스 제거하기 : ", audits["render-blocking-resources"].numericValue);
    console.log("렌더링 차단 리소스 제거하기 : ", audits["render-blocking-resources"].numericUnit);
    
    console.log("효율적으로 이미지 인코딩하기 : ", audits["uses-optimized-images"]); // 숫자 있음
    console.log("웹폰트가 로드되는 동안 모든 텍스트가 계속 표시됩니다 : ", audits["font-display"]); // 숫자 없음
    console.log("화면 로딩 캡처 : ", audits["screenshot-thumbnails"].details.items); // image data 든 객체 10게 든 배열, 마지막 image가 대표사진인 것 같다
    console.log(" : ", audits["metrics"]); // ?????? 수치 모음?
    console.log(" : ", audits["timing-budget"].displayValue); // ?????
    
    console.log("과도한 DOM 크기 지양하기 : ", audits["dom-size"].numericValue);
    console.log("과도한 DOM 크기 지양하기 : ", audits["dom-size"].numericUnit);
    
    console.log(" : ", audits["diagnostics"].displayValue);  // ???? 진단 모음??
    console.log("document.write() 지양하기 : ", audits["no-document-write"].displayValue); // 숫자 없음
    
    console.log("콘텐츠가 포함된 최대 페인트 이미지 미리 로드 : ", audits["preload-lcp-image"].numericValue);
    console.log("콘텐츠가 포함된 최대 페인트 이미지 미리 로드 : ", audits["preload-lcp-image"].numericUnit);
    
    console.log("대표 사진 : ", audits["final-screenshot"].details); // 스크린샷의 마지막 사진 객체
    console.log("애니메이션 콘텐츠에 동영상 형식 사용하기 : ", audits["efficient-animated-content"]); // 숫자 0
    console.log("CSS 축소하기 : ", audits["unminified-css"]); // 숫자 0
    console.log("필수 원본 미리 연결하기 : ", audits["uses-rel-preconnect"]); // 숫자 0
    console.log(" : ", audits["network-server-latency"].displayValue); // ??????
    console.log(" : ", audits["network-requests"].displayValue); // ???? 네트워크 요청?
    console.log("효율적인 캐시 정책을 사용하여 정적인 애셋 제공하기 : ", audits["uses-long-cache-ttl"].displayValue); // 리소스 8개 발견됨
    console.log("초기 서버 응답 시간 짧음 : ", audits["server-response-time"].displayValue);  // title
    console.log("자바스크립트 실행 시간 : ", audits["bootup-time"].displayValue);
    console.log("퍼사드로 타사 리소스 지연 로드 : ", audits["third-party-facades"].displayValue); // score null
    console.log("최대 콘텐츠 렌더링 시간 이미지가 지연 로드되지 않았습니다 : ", audits["lcp-lazy-loaded"].displayValue); // score 1
    console.log(" : ", audits["full-page-screenshot"].details.screenshot); // 이미지 객체

    console.log("차세대 형식을 사용해 이미지 제공하기 : ", audits["modern-image-formats"].numericValue);
    console.log("차세대 형식을 사용해 이미지 제공하기 : ", audits["modern-image-formats"].numericUnit);
    
    console.log("이미지 크기 적절하게 설정하기 : ", audits["uses-responsive-images"].numericValue); // score 0
    console.log("이미지 크기 적절하게 설정하기 : ", audits["uses-responsive-images"].numericUnit);
    
    console.log("합성 작업을 거치지 않은 애니메이션 지양하기 : ", audits["non-composited-animations"]); // score null
    console.log("이미지 요소에 width 및 height가 명시되어 있지 않습니다 : ", audits["unsized-images"]); // score 0

    console.log("오프스크린 이미지 지연하기 : ", audits["offscreen-images"].displayValue); // score 1
    console.log("자바스크립트 줄이기 : ", audits["unminified-javascript"].numericValue); // score 1
    console.log("중요 요청 체이닝 차단 : ", audits["critical-request-chains"].displayValue); // score null
    console.log("여러 차례의 페이지 리디렉션 피하기 : ", audits["redirects"].numericValue); // score 1
    console.log("??? : ", audits["max-potential-fid"].numericValue); // ??
    console.log('width 또는 initial-scale이(가) 포함된 <meta name="viewport"> 태그가 있음 : ', audits["viewport"]); // score 1
    console.log("타사 사용량 최소화 : ", audits["third-party-summary"]); // score null
    console.log("사용자 타이밍 표시 및 측정 값 : ", audits["user-timings"]); // score null
    console.log("레거시 JavaScript를 최신 브라우저에 제공하지 않기  : ", audits["legacy-javascript"].displayValue); // score 1
    console.log(" : ", audits[""].displayValue);
    console.log("----------------------------------------");
    // 파싱
    
  }

  useEffect(() => {
    if (mobile){
      // console.log(typeof(mobile))
      // console.log("제발 되라우", mobile)
      // console.log("저녁각", mobile.data.lighthouseResult.categories.performance)
      setPerformanceReport(checkMobile());
    }
  }, [mobile]);

  const { FCP, SI, LCP, TTI, TBT, CLS } = performanceReport;
  
  return (
    <div className='App'>
      <div>
        <input type='text' id='url' name='url' placeholder='웹페이지 URL 입력' onChange={onChangeUrl}></input>
        <button onClick={drawWebPerformanceResult}>성능 측정하기</button>
        {/* <button onClick={handleClickCheckMobile}>모바일 체크</button> */}
        <button onClick={parsingMobileResult}>모바일 체크2</button>
      </div>
      {/* 측정 결과 */}
      <div>
        <div>score</div>
        <div>{`FCP : ${FCP.displayValue}`}</div>
        <div>{`SI : ${SI.displayValue}`}</div>
        <div>{`LCP : ${LCP.displayValue}`}</div>
        <div>{`TTI : ${TTI.displayValue}`}</div>
        <div>{`TBT : ${TBT.displayValue}`}</div>
        <div>{`CLS : ${CLS.displayValue}`}</div>
        
        {/* {anything} */}
      </div>
      <div>
        <div id="div01"></div>
        {/* <p>모바일 = {mobile}</p> */}
        {/* <p>데스크탑 = {desktop}</p> */}
      </div>
    </div>
  );
}