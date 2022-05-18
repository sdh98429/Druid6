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

  const grade = () => {
    if (performanceScore >= 90) {
      return "A";
    } else if (performanceScore >= 50) {
      return "B";
    } else {
      return "C";
    }
  };

  return (
    <div className="score-chart" style={{ color: `${Color}` }}>
      <Doughnut data={data} performanceScore={performanceScore} />
      <div
        className="performance-score-grade"
        style={{
          position: "absolute",
          textAlign: "center",
          // bottom: "10.5rem",
          top: "31vh",
          left: "66.5vh",
          fontSize: "100px",
        }}
      >
        {/* {performanceScore} */}
        {grade()}
      </div>
      <div
        className="performance-score-number"
        style={{
          position: "absolute",
          textAlign: "center",
          top: "48vh",
          left: "67vh",
          fontSize: "50px",
        }}
      >
        {performanceScore}
      </div>
    </div>
  );
}
