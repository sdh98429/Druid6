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
        const overallSavingMs = value["details"]["overallSavingsMs"];
        if (overallSavingMs >= 100) {
          selectedAudits.push(value);
        }
      } catch {
        //
      }
    });
    setRecommendations(selectedAudits);
  };

  return (
    <div>
      {recommendations.map((recommendation, idx) => (
        <Recommendation recommendation={recommendation} key={idx} />
      ))}
    </div>
  );
}
