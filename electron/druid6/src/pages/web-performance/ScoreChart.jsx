import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function ScoreChart({ performanceScore, Color }) {
  const data = {
    // labels: ["Red", "Blue"],
    datasets: [
      {
        // label: "# of Votes",
        data: [performanceScore, 100 - performanceScore],
        backgroundColor: ["rgba(0, 255, 0, 0.2)", "rgba(255, 0, 0, 0.2)"],
        borderColor: ["rgba(0, 255, 0, 1)", "rgba(255, 0, 0, 1)"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="score-chart" style={{ color: `${Color}` }}>
      <Doughnut data={data} performanceScore={performanceScore} />
      <div
        className="performance-score-number"
        style={{
          position: "relative",
          textAlign: "center",
          bottom: "10.5rem",
          fontSize: "3rem",
        }}
      >
        {performanceScore}
      </div>
    </div>
  );
}
