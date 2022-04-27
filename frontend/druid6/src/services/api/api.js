import axios from 'axios';

const requestWebPerformanceResult = async (objectUrl) => {
  const res = await axios.get('https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=https://www.naver.com&key=AIzaSyBOygDNTGhoOylmM1oyOOLjch2gNdiwFZQ');
  return res;
};

export default requestWebPerformanceResult;
