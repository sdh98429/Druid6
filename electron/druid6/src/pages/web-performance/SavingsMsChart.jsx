import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function SavingsMsChart({ overallSavingsMs, xScaleMaxValue }) {
  const options = {
    indexAxis: "y",
    elements: {
      bar: {
        borderWidth: 0,
      },
    },
    responsive: true,
    maintainAspectRatio: false, // 비율 유지?
    plugins: {
      legend: {
        display: false,
        position: "right",
      },
      title: {
        display: false,
        text: "Chart.js Horizontal Bar Chart",
      },
    },
    scales: {
      x: {
        reverse: true,
        ticks: {
          display: false,
        },
        grid: {
          display: false,
          drawBorder: false,
        },
        axis: "x", // x축(가로축)인지 y축(세로축)인지 표시합니다.
        max: xScaleMaxValue, // 축의 최대값을 강제합니다.
        min: 0, // 축의 최소값을 강제합니다.
      },
      y: {
        grid: {
          display: false,
          drawBorder: false,
        },
      },
    },
  };

  const labels = [" "];
  const data = {
    labels,
    datasets: [
      {
        // label: "Dataset 1",
        data: labels.map(() => overallSavingsMs),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return (
    <div className="SavingsMsChart">
      <Bar options={options} data={data} />
    </div>
  );
}
