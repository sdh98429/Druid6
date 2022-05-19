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
import { faker } from "@faker-js/faker";
import "./ResponseStatisticChart.scss";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function ResponseStatisticChart({ latencies }) {
  const { totalLatencies, latencyAvg, minLatency, maxLatency, p95, p99 } =
    latencies;

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: "y",
    elements: {
      bar: {
        borderWidth: 1,
      },
    },
    plugins: {
      legend: {
        position: "right",
        display: false,
      },
    },
  };

  const labels = ["Min", "Max", "Average", "p95", "p99"];

  const data = {
    labels,
    datasets: [
      {
        data: [minLatency, maxLatency, latencyAvg, p95, p99],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 205, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(54, 162, 235, 0.2)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
        ],
      },
    ],
  };
  return (
    <div className="ResponseStatisticChart">
      <Bar options={options} data={data} />
    </div>
  );
}
