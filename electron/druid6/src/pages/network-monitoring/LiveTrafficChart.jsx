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
import ChartStreaming from "chartjs-plugin-streaming";

import { Bar } from "react-chartjs-2";
import { faker } from "@faker-js/faker";
import { range } from "../../services/utils";
import { useState } from "react";
import "./LiveTrafficChart.scss";
import "chartjs-adapter-luxon";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ChartStreaming,
  Title,
  Tooltip,
  Legend
);

ChartJS.defaults.set("plugins.streaming", {
  duration: 20000,
});

// const chart = new ChartJS(ctx, {
//   options: {
//     plugins: {
//       // Change options for ALL axes of THIS CHART
//       streaming: {
//         duration: 20000,
//       },
//     },
//     scales: {
//       x: {
//         type: "realtime",
//         // Change options only for THIS AXIS
//         realtime: {
//           duration: 20000,
//         },
//       },
//     },
//   },
// });

export default function LiveTrafficChart() {
  let rxArray = [];
  let txArray = [];
  let rxArray2 = [];
  let txArray2 = [];

  const options = {
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: false,
      },
      streaming: {
        onRefresh: function (chart) {
          console.log("refresh@");
          console.log(chart);
          chart.data.datasets = rxArray;
          chart.data.datasets = txArray;
        },
        delay: 500,
        refresh: 1000,
        frameRate: 30,
        duration: 3600000, // 3600000 = 1hour
      },
    },
    responsive: true,
    scales: {
      x: {
        type: "realtime",
        stacked: true,
        realtime: {
          duration: 20000,
        },
      },
      y: {
        type: "realtime",
        stacked: true,
        realtime: {
          duration: 20000,
        },
      },
    },
    animation: {
      duration: 0,
    },
  };

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
    rxArray = rxArray2;
    txArray = txArray2;
    // console.log(rxArray);
  }, 1000);
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
        data: [1],
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
