import './WebPerformance.css';
import requestWebPerformanceResult from './services/api/WebPerformance';
import * as React from 'react';


export default function WebPerformance() {

  // url input값 가져오기
  //input에서 value를 담기 위한 state 생성 
  const [url, setUrl] = React.useState(""); 
  
  //input에 입력될 때마다 account state값 변경되게 하는 함수 
  const onChangeUrl = (e) => { setUrl(e.target.value); };


  // api 요청값 저장할 state 생성
  const [mobile, setMobile] = React.useState("");

  const handleChangeMobile = (newValue) => {
    setMobile(newValue);
  };

  const [desktop, setDesktop] = React.useState("");

  const handleChangeDesktop = async (newValue) => {
    setDesktop(newValue);
  };

  React.useEffect(() => {
    if (mobile){
      console.log(typeof(mobile))
      console.log("제발 되라우", mobile)
      console.log("저녁각", mobile.data.lighthouseResult.categories.performance)
    }
  }, [mobile]);

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
    console.log("파싱")
    console.log(parseMobile)
  }

  const checkMobile = () => {
    const parseMobile = JSON.parse(mobile)
    console.log(parseMobile.data.lighthouseResult.categories.performance)
  }

  return (
    <div className='App'>
      <div>
        <input type='text' id='url' name='url' placeholder='웹페이지 URL 입력' onChange={onChangeUrl}></input>
        <button onClick={drawWebPerformanceResult}>성능 측정하기</button>
        <button onClick={checkMobile}>모바일 체크</button>
        <button onClick={parsingMobileResult}>모바일 체크2</button>
      </div>
      {/* 측정 결과 */}
      <div>
        
      </div>
      <div>
        {/* <p>모바일 = {mobile}</p> */}
        {/* <p>데스크탑 = {desktop}</p> */}
      </div>
    </div>
  );
}