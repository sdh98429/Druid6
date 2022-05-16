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
    console.log(Object.values(audits).length);

    Object.values(audits).forEach((value) => {
      try {
        const overallSavingMs = value["details"]["overallSavingsMs"];
        if (overallSavingMs >= 100) {
          console.log("it is more than 100!");
          setRecommendations([...recommendations, value]);
        }
        console.log(recommendations.length);
      } catch {
        //
      }
    });

    // for (let key in audits) {
    //   try {
    //     let overallSavingsMs = audits[key]["details"]["overallSavingsMs"];
    //     if (overallSavingsMs >= 100) {
    //       setRecommendations([...recommendations, audits[key]]);
    //     }
    //   } catch (err) {
    //     continue;
    //   }
    // }
  };

  return (
    <div>
      {recommendations.map((recommendation, idx) => (
        <Recommendation recommendation={recommendation} key={idx} />
      ))}
    </div>
  );
}
