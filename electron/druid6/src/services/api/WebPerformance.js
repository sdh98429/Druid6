import axios from 'axios';

const requestWebPerformanceResult = async (objectUrl, strategy) => {
  const res = await axios.get(`https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${objectUrl}&strategy=${strategy}&locale=ko&key=AIzaSyBOygDNTGhoOylmM1oyOOLjch2gNdiwFZQ`);
  return res;
};

export default requestWebPerformanceResult;
