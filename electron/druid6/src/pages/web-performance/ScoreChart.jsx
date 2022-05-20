import React, { useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function ScoreChart({ performanceScore, Color }) {
  const [doughnutColorState, setDoughnutColorState] = useState(
    "rgba(232, 232, 232, 1)"
  );

  const [grade, setGrade] = useState("X");

  useEffect(() => {
    if (performanceScore >= 90) {
      setDoughnutColorState("rgba(0, 255, 0, 0.2)");
      setGrade("A");
    } else if (performanceScore >= 50) {
      setDoughnutColorState("rgba(255, 120, 0, 0.2)");
      setGrade("B");
    } else {
      setDoughnutColorState("rgba(255, 0, 0, 0.2)");
      setGrade("C");
    }
  }, [performanceScore]);

  const data = {
    datasets: [
      {
        data: [performanceScore, 100 - performanceScore],
        backgroundColor: [doughnutColorState, "rgba(232, 232, 232, 1)"],
        borderColor: ["rgba(255, 255, 255, 1)", "rgba(255, 255, 255, 0.2)"],
        borderWidth: 1,
        cutout: "80%",
      },
    ],
  };

  return (
    <div className="score-chart" style={{ color: `${Color}` }}>
      <Doughnut data={data} performanceScore={performanceScore} />
      <div
        className="performance-score-grade"
        style={{
          position: "absolute",
          textAlign: "center",
          top: "27%",
          left: "33rem",
          fontSize: "100px",
        }}
      >
        {grade}
      </div>
      <div
        className="performance-score-number"
        style={{
          position: "absolute",
          textAlign: "center",
          top: "42%",
          left: "33.25rem",
          fontSize: "50px",
        }}
      >
        {performanceScore}
      </div>
    </div>
  );
}
