import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { faker } from "@faker-js/faker";
import { range } from "../../services/utils";
import { useState } from "react";
import "./LiveTrafficChart.scss";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
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
  animation: {
    duration: 0,
  },
};

export default function LiveTrafficChart() {
  const [rxArray, setRxArray] = useState([]);
  const [txArray, setTxArray] = useState([]);
  let rxArray2 = [];
  let txArray2 = [];
  window.ipcRenderer.on("networkRealTime", (event, arg) => {
    let realtime = arg.replace("[1G[2K", "");
    let realtimeArray = realtime.split(" ");

    if (txArray2.length === 31) {
      rxArray2.pop();
      txArray2.pop();
    }

    rxArray2.splice(0, 0, realtimeArray[7] * 1);
    txArray2.splice(0, 0, realtimeArray[27] * 1);
  });
  setInterval(function () {
    setRxArray(rxArray2);
    setTxArray(txArray2);
  }, 5000);
  const labels = range(1, 31);
  const transmitData = labels.map((idx) => txArray[idx]);
  const recieveData = labels.map((idx) => rxArray[idx]);
  const txRxSumData = labels.map(
    (ele, idx) => transmitData[idx] + recieveData[idx]
  );

  const data = {
    labels,
    datasets: [
      {
        label: "Transmit",
        data: rxArray,
        backgroundColor: "rgb(255, 99, 132)",
      },
      {
        label: "Receive",
        data: txArray,
        backgroundColor: "rgb(75, 192, 192)",
      },
      {
        label: "TxRxSum",
        data: txRxSumData,
        borderColor: "#FF6801",
        backgroundColor: "#E64E00",
        type: "line",
      },
    ],
  };
  return (
    <div className="LiveTrafficChart">
      <Bar options={options} data={data} />
    </div>
  );
}
