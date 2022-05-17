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
import { ConstructionOutlined } from "@mui/icons-material";

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
      ticks: { display: false },
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
  window.ipcRenderer.on("networkRealTime", (event, arg) => {
    let realtime = arg.replace("[1G[2K", "");
    let realtimeArraySplit = realtime.split(" ");
    let realTimeArray = [];
    for (let i = 0; i < realtimeArraySplit.length; i++) {
      if (realtimeArraySplit[i] !== "") {
        realTimeArray.push(realtimeArraySplit[i]);
      }
    }
    console.log(realTimeArray);
    let rxkib = realTimeArray[1] * 1;
    let txkib = realTimeArray[6] * 1;
    if (realTimeArray[2] === "Mbit/s") rxkib *= 1000;
    if (realTimeArray[7] === "Mbit/s") txkib *= 1000;
    if (txArray.length >= 32) {
      setRxArray(rxArray.filter((value, index) => index !== 0));

      setTxArray(txArray.filter((value, index) => index !== 0));
    } else {
      setRxArray([...rxArray, rxkib]);
      setTxArray([...txArray, txkib]);
    }
  });
  const labels = range(1, 31);
  // const transmitData = labels.map((idx) => txArray[idx]);
  // const recieveData = labels.map((idx) => rxArray[idx]);
  // const txRxSumData = labels.map(
  //   (ele, idx) => transmitData[idx] + recieveData[idx]
  // );

  const data = {
    labels,
    datasets: [
      {
        label: "Transmit",
        data: txArray,
        backgroundColor: "rgb(255, 99, 132)",
      },
      {
        label: "Receive",
        data: rxArray,
        backgroundColor: "rgb(75, 192, 192)",
      },
      // {
      //   label: "TxRxSum",
      //   data: txRxSumData,
      //   borderColor: "#FF6801",
      //   backgroundColor: "#E64E00",
      //   type: "line",
      // },
    ],
  };
  return (
    <div className="LiveTrafficChart">
      <Bar options={options} data={data} />
    </div>
  );
}
