import "./Solutions.scss";
import Recommendation from "./Recommendation";
import { useEffect, useState } from "react";

export default function Solutions({ mobileData }) {
  const [recommendations, setRecommendations] = useState([]);
  const [maxOverallSavingsMs, setMaxOverallSavingsMs] = useState(0);

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
    setMaxOverallSavingsMs(
      Math.round(
        (selectedAudits[0].details.overallSavingsMs / 1000 + Number.EPSILON) *
          100
      ) / 100
    );
  };

  return (
    <div className="Solutions">
      <div className="container table-size">
        <div className="item">
          <span>추천 항목</span>
          <span>예상 절감 시간</span>
        </div>
        {recommendations.map((recommendation, idx) => (
          <Recommendation
            recommendation={recommendation}
            maxOverallSavingsMs={maxOverallSavingsMs}
            key={idx}
          />
        ))}
      </div>
    </div>
  );
}
