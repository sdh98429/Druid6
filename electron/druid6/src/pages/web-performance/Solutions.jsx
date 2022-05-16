import "./Solutions.scss";
import { useEffect, useState } from "react";

// 추천 항목 당 컴포넌트
function Recommendation({ recommendation }) {
  return (
    <div>
      <b>{recommendation.title}</b>
      <span>({recommendation.details.overallSavingsMs})</span>
    </div>
  );
}

export default function Solutions({ mobileData }) {
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    if (mobileData) {
      checkMobileSolutions();
    }
  }, [mobileData]);

  const checkMobileSolutions = () => {
    // SelectAudits
    const audits = mobileData.data.lighthouseResult.audits;

    let selectedAudits = [];
    Object.values(audits).forEach((value) => {
      try {
        const overallSavingsMs = value["details"]["overallSavingsMs"];
        if (overallSavingsMs >= 100) {
          selectedAudits.push(value);
        }
      } catch {
        //
      }
    });
    selectedAudits.sort(function (a, b) {
      return b.details.overallSavingsMs - a.details.overallSavingsMs;
    });
    setRecommendations(selectedAudits);
  };

  return (
    <div className="Solutions">
      <div className="container">
        <div className="item item1">1</div>
        <div className="item item2">2</div>
        <div className="item item3">3</div>
        <div className="item item4">4</div>
        <div className="item item5">5</div>
        <div className="item item6">6</div>
      </div>

      {recommendations.map((recommendation, idx) => (
        <Recommendation recommendation={recommendation} key={idx} />
      ))}
    </div>
  );
}
