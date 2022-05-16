import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { faker } from "@faker-js/faker";
import { range } from "../../services/utils";
import { useSelector } from "react-redux";

import "./DailyTrafficChart.scss";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  maintainAspectRatio: false,
  plugins: {
    title: {
      display: false,
    },
  },
  responsive: true,
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
};

const labels = range(1, 31);
const data2 = [0, 1, 2, 3, 4, 5, 5, 6, 8, 1, 2, 3, 4, 5, 6];
const transmitData = labels.map(() => 2);
const recieveData = labels.map((idx) => data2[idx]);
const txRxSumData = labels.map(
  (ele, idx) => transmitData[idx] + recieveData[idx]
);

console.log(transmitData, recieveData, txRxSumData);
export const data = {
  labels,
  datasets: [
    {
      label: "Transmit",
      data: transmitData,
      backgroundColor: "rgb(255, 99, 132)",
    },
    {
      label: "Receive",
      data: recieveData,
      backgroundColor: "rgb(75, 192, 192)",
    },
  ],
};
export default function DailyTrafficChart() {
  const { traffic } = useSelector((state) => ({
    traffic: state.traffic,
  }));
  console.log(traffic.split("\n"));
  return (
    <div className="DailyTrafficChart">
      <Bar options={options} data={data} />
    </div>
  );
}
