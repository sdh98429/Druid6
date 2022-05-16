import React, { useEffect, useState } from "react";

// 추천 항목 당 컴포넌트
function Recommendation({ recommendation }) {
  return (
    <div>
      <b>{recommendation.title}</b>
      <span>({recommendation.details.overallSavingsMs})</span>
    </div>
  );
}

export default function Solutions(props) {
  const mobile = props.mobile;

  const [recommendationArray, setRecommendationArray] = useState([]);

  useEffect(() => {
    if (mobile) {
      checkMobileSolutions();
    }
  }, [mobile]);

  const checkMobileSolutions = () => {
    // 파싱
    const audits = mobile.data.lighthouseResult.audits;
    for (let key in audits) {
      try {
        let overallSavingsMs = audits[key]["details"]["overallSavingsMs"];
        if (overallSavingsMs >= 100) {
          setRecommendationArray([...recommendationArray, audits[key]]);
        }
      } catch (err) {
        continue;
      }
    }
  };

  return (
    <div>
      {props.displaySolutions === true ? (
        recommendationArray.map((recommendation, idx) => {
          return <Recommendation recommendation={recommendation} key={idx} />;
        })
      ) : (
        <div>렌더링 전</div>
      )}
    </div>
  );
}
