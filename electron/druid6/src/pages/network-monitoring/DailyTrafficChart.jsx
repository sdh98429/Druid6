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

export default function DailyTrafficChart() {
  const { traffic } = useSelector((state) => ({
    traffic: state.traffic,
  }));

  let dailyTraffic = traffic.split("\n");
  let dailyTrafficArray = new Array(dailyTraffic.length);
  for (var i = 0; i < dailyTraffic.length; i++) {
    dailyTrafficArray[i] = dailyTraffic[i].split(" ");
  }

  const dataRx = new Array(32);
  const dataTx = new Array(32);
  for (var i = 0; i < dailyTraffic.length; i++) {
    if (dailyTrafficArray[i].length === 5) {
      let trafficRxKib = dailyTrafficArray[i][1];
      let trafficTxKib = dailyTrafficArray[i][3];
      if (dailyTrafficArray[i][2] === "MiB") trafficRxKib *= 1000;
      if (dailyTrafficArray[i][2] === "GiB") trafficRxKib *= 1000000;
      if (dailyTrafficArray[i][4] === "MiB") trafficTxKib *= 1000;
      if (dailyTrafficArray[i][4] === "GiB") trafficTxKib *= 1000000;

      dataRx.splice(
        dailyTrafficArray[i][0].slice(-2, dailyTrafficArray.length + 1),
        0,
        trafficRxKib
      );
      dataTx.splice(
        dailyTrafficArray[i][0].slice(-2, dailyTrafficArray.length + 1),
        0,
        trafficTxKib
      );
    }
  }
  const labels = range(1, 31);

  const transmitData = labels.map((idx) => dataTx[idx]);
  const recieveData = labels.map((idx) => dataRx[idx]);

  const data = {
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
  return (
    <div className="DailyTrafficChart">
      <Bar options={options} data={data} />
    </div>
  );
}
