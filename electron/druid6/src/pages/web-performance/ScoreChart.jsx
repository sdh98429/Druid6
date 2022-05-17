import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

// export const data = {
//   labels: ["Red", "Blue"],
//   datasets: [
//     {
//       label: "# of Votes",
//       data: [{ performanceScore }, 100 - { performanceScore }],
//       backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
//       borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
//       borderWidth: 1,
//     },
//   ],
// };

export default function ScoreChart({ performanceScore }) {
  const data = {
    // labels: ["Red", "Blue"],
    datasets: [
      {
        // label: "# of Votes",
        // data: [{ performanceScore }, 100 - { performanceScore }],
        data: [performanceScore, 100 - performanceScore],
        // data: [0, 100],
        // backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
        backgroundColor: ["rgba(0, 255, 0, 0.2)", "rgba(255, 0, 0, 0.2)"],
        // borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
        borderColor: ["rgba(0, 255, 0, 1)", "rgba(255, 0, 0, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const doughnutOptions = {
    legend: {
      display: true,
    },
    plugins: {
      doughnutlabel: {
        labels: [
          {
            text: "ITEMS",
            color: "#666666",
            font: {
              size: 30,
            },
          },
          {
            text: "TEST",
            color: "#888888",
          },
        ],
      },
    },
  };

  return (
    <div>
      <Doughnut
        data={data}
        performanceScore={performanceScore}
        options={doughnutOptions}
      >
        {/* <div style={{ position: "relative" }}>asdf</div> */}
      </Doughnut>
      <div
        style={{ position: "relative", textAlign: "center", bottom: "10.5rem" }}
      >
        70
      </div>
      {performanceScore}
    </div>
  );
}
