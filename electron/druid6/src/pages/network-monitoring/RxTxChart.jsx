import "./RxTxChart.scss";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useState } from "react";

ChartJS.register(ArcElement, Tooltip, Legend);
export const options = {
  maintainAspectRatio: false,
  plugins: {
    title: {
      display: false,
    },
  },
  responsive: true,
};

export default function RxTxChart() {
  const [networkTx, setNetworkTx] = useState(0);
  const [networkRx, setNetworkRx] = useState(0);

  window.ipcRenderer.on("networkRealTime", (event, arg) => {
    let realtime = arg.replace("[1G[2K", "");
    let realtimeArraySplit = realtime.split(" ");
    let realTimeArray = [];
    for (let i = 0; i < realtimeArraySplit.length; i++) {
      if (realtimeArraySplit[i] !== "") {
        realTimeArray.push(realtimeArraySplit[i]);
      }
    }
    let rxkib = realTimeArray[1] * 1;
    let txkib = realTimeArray[6] * 1;
    if (realTimeArray[2] === "bit/s") rxkib *= 0.001;
    if (realTimeArray[7] === "bit/s") txkib *= 0.001;
    if (realTimeArray[2] === "Mbit/s") rxkib *= 1000;
    if (realTimeArray[7] === "Mbit/s") txkib *= 1000;
    if (realTimeArray[2] === "Gbit/s") rxkib *= 1000000;
    if (realTimeArray[7] === "Gbit/s") txkib *= 1000000;
    setNetworkRx(rxkib);
    setNetworkTx(txkib);
  });
  const data = {
    labels: ["transmit", "recieve"],
    datasets: [
      {
        label: "# of Votes",
        data: [networkTx, networkRx],
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
        borderWidth: 1,
      },
    ],
  };
  return (
    <div className="RxTxChart">
      <Doughnut data={data} options={options} />
    </div>
  );
}
