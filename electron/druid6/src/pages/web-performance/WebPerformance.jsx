import './WebPerformance.scss';
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
  }


  const checkMobile = () => {
    const performanceReport = {};
    
    const audit = mobile.data.lighthouseResult.audits
   


    performanceReport['FCP'] = audit["first-contentful-paint"]
    performanceReport['SI'] = audit["speed-index"]
    performanceReport['LCP'] = audit["largest-contentful-paint"]
    performanceReport['TTI'] = audit["interactive"]
    performanceReport['TBT'] = audit["total-blocking-time"]
    performanceReport['CLS'] = audit["cumulative-layout-shift"]
    
    performanceReport['performanceScore'] = parseInt(10 * audit["first-contentful-paint"].score + 10 * audit["interactive"].score + 25 * audit["speed-index"].score + 10 * audit["total-blocking-time"].score + 30 * audit["largest-contentful-paint"].score + 15 * audit["cumulative-layout-shift"].score)
    
    performanceReport['screenshot'] = audit["final-screenshot"].details.data

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
    'screenshot': '',
    'performanceScore' : 0,
  }
  const [ performanceReport, setPerformanceReport ] = useState(initialPerformanceReport);


  // const handleClickCheckMobile = () => {
  //   setPerformanceReport(checkMobile());
  // };

  useEffect(() => {
    if (mobile){
      // console.log(typeof(mobile))
      // console.log("제발 되라우", mobile)
      // console.log("저녁각", mobile.data.lighthouseResult.categories.performance)
      setPerformanceReport(checkMobile());
    }
  }, [mobile]);

  const { FCP, SI, LCP, TTI, TBT, CLS, screenshot, performanceScore } = performanceReport;

  const [coreValueDetail, setCoreValueDetail] = useState("각 메트릭을 클릭하면 세부 설명을 볼 수 있습니다.");

  const handleChangeCoreValueDetail = (newValue) => {
    setCoreValueDetail(newValue);
  };


  const changeColor = () => {
    if (performanceScore){
      if (performanceScore >= 90){
        return "green"
      } else if (performanceScore >= 50){
        return "orange"
      } else {
        return "red"
      }
    } else {
      return "black"
    }
  }

  const Color = changeColor();

  const FCPDetail = "최초 콘텐츠풀 페인트(FCP)는 사용자가 화면에서 콘텐츠를 볼 수 있는 페이지 로드 타임라인의 첫 번째 지점을 표시하기 때문에 사용자가 감지하는 로드 속도를 측정할 수 있는 중요한 사용자 중심 메트릭입니다. FCP가 빠르면 사용자가 페이지에서 뭔가가 진행되고 있음을 인지해 안심할 수 있습니다."
  const TTIDetail = "TTI는 페이지가 완전히 상호 작용 가능하게 되는 데 걸리는 시간을 측정합니다. 다음과 같은 경우에 페이지가 완전한 상호 작용 가능한 것으로 간주됩니다.\n페이지에 첫 번째 콘텐츠풀 페인트에 의해 측정되는 유용한 콘텐츠가 표시됩니다.\n가장 많이 보이는 페이지 요소에 이벤트 핸들러가 등록됩니다.\n페이지가 50밀리초 이내에 사용자 상호 작용에 응답합니다."
  const SIDetail = "속도 색인(Speed Index)는 사용자가 볼 수 있는 컨텐츠를 렌더링하는데 걸리는 속도입니다. 페이지 로드 중에 콘텐츠가 시각적으로 표시되는 속도를 측정합니다."
  const TBTDetail = "TBT는 마우스 클릭, 화면 탭 또는 키보드 누름과 같은 사용자 입력으로부터 페이지가 응답하지 못하도록 차단된 총 시간을 측정합니다. 합계는 최초 콘텐츠풀 페인트와 상호 작용까지의 시간 사이의 모든 긴 작업의 차단 부분을 더하여 계산합니다. 50ms 이상 실행되는 모든 작업은 긴 작업입니다. 50ms 이후의 시간이 차단 부분입니다. 예를 들어 Lighthouse가 70ms 길이의 작업을 감지하면 차단 부분은 20ms가 됩니다."
  const LCPDetail = "최대 콘텐츠풀 페인트(LCP)는 페이지의 메인 콘텐츠가 로드되었을 가능성이 있을 때 페이지 로드 타임라인에 해당 시점을 표시하므로 사용자가 감지하는 로드 속도를 측정할 수 있는 중요한 사용자 중심 메트릭입니다. LCP가 빠르면 사용자가 해당 페이지를 사용할 수 있다고 인지하는 데 도움이 됩니다."
  const CLSDetail = "누적 레이아웃 이동(CLS)은 사용자가 예상치 못한 레이아웃 이동을 경험하는 빈도를 수량화하므로 시각적 안정성을 측정할 때 중요한 사용자 중심 메트릭입니다. CLS가 낮으면 우수한 사용자 경험을 보장하는 데 도움이 됩니다."

  return (
    <div className='WebPerformance'>
      <div>
        <input type='text' id='url' name='url' placeholder='웹페이지 URL 입력' onChange={onChangeUrl}></input>
        <button onClick={drawWebPerformanceResult}>성능 측정하기</button>
        {/* <button onClick={handleClickCheckMobile}>모바일 체크</button> */}
        <button onClick={parsingMobileResult}>모바일 체크2</button>
      </div>

      <div className='api-result'>
        <div className='api-graph'>
          <div className='api-score'>
              {/* <div className='coreValueTitle'>Score</div> */}
              {/* <div className='coreValueBody'>{`${parseInt(10 * FCP.score + 10 * TTI.score + 25 * SI.score + 10 * TBT.score + 30 * LCP.score + 15 * CLS.score)}`}</div>  */}
              <div className='coreValueBody' style={{color : `${Color}`}}>{performanceScore}</div> 
              {/* <div className='coreValueBody'>{performanceScore}</div>  */}
          </div>
          <div className='final-image'>
            <img src={`${screenshot}`} alt="" />
          </div>
        
        </div>
        <div className='api-detail'>
          <div className='represent'>

            {/* <div className='coreValue'> */}
            <div className='coreValue' onClick={ () => handleChangeCoreValueDetail(FCPDetail)}>
            {/* <div className='coreValue' onClick={handleChangeCoreValueDetail(detail1)}> */}
              <div className='coreValueTitle'>First Contentful Paint</div>
              <div className='coreValueBody'>{`${FCP.displayValue}`}</div>
              {/* <div className='coreValueBody'>{`${JSON.stringify(FCP)}`}</div> */}
            </div>

            <div className='coreValue' onClick={ () => handleChangeCoreValueDetail(TTIDetail)}>
              <div className='coreValueTitle'>Time to Interactive</div>
              <div className='coreValueBody'>{`${TTI.displayValue}`}</div>
              {/* <div className='coreValueBody'>{`${JSON.stringify(TTI)}`}</div> */}
            </div>

            <div className='coreValue' onClick={ () => handleChangeCoreValueDetail(SIDetail)}>
              <div className='coreValueTitle'>Speed Index</div>
              <div className='coreValueBody'>{`${SI.displayValue}`}</div>
              {/* <div className='coreValueBody'>{`${JSON.stringify(SI)}`}</div> */}
            </div>

            <div className='coreValue' onClick={ () => handleChangeCoreValueDetail(TBTDetail)}>
              <div className='coreValueTitle'>Total Blocking Time</div>
              <div className='coreValueBody'>{`${TBT.displayValue}`}</div>
              {/* <div className='coreValueBody'>{`${JSON.stringify(TBT)}`}</div> */}
            </div>

            <div className='coreValue' onClick={ () => handleChangeCoreValueDetail(LCPDetail)}>
              <div className='coreValueTitle'>Largest Contentful Paint</div>
              <div className='coreValueBody'>{`${LCP.displayValue}`}</div>
              {/* <div className='coreValueBody'>{`${JSON.stringify(LCP)}`}</div> */}
            </div>

            <div className='coreValue' onClick={ () => handleChangeCoreValueDetail(CLSDetail)}>
              <div className='coreValueTitle'>Cumulative Layout Shift</div>
              <div className='coreValueBody'>{`${CLS.displayValue}`}</div>
              {/* <div className='coreValueBody'>{`${JSON.stringify(CLS)}`}</div> */}
            </div>
            
          </div>
          <div className='description'>
            <div></div>
            <div>{`${coreValueDetail}`}</div>
          </div>
        </div>
      </div>


    </div>
  );
}