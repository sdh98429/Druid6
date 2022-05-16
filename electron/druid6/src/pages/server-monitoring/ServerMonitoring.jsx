import { useState } from "react";
import "./ServerMonitoring.scss";
import ServerInfo from "./ServerInfo";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

export default function ServerMonitoring() {
  ChartJS.register(ArcElement, Tooltip, Legend);

  const { ipcRenderer } = window.require("electron");

  const [cpuUsage, setCpuUsage] = useState("");
  ipcRenderer.on("cpu", (event, arg) => {
    setCpuUsage(arg);
  });

  const [DiskUsage, setDiskUsage] = useState("");
  ipcRenderer.on("disk", (event, arg) => {
    setDiskUsage(arg);
  });

  const [MemoryUsage, setMemoryUsage] = useState("");
  ipcRenderer.on("memory", (event, arg) => {
    setMemoryUsage(arg);
  });

  const [networkRealTime, setNetworkRealTime] = useState("");
  ipcRenderer.on("networkRealTime", (event, arg) => {
    let realtime = arg.replace("[1G[2K", "");
    let realtimeArray = realtime.split(" ");
    let rx = realtimeArray[7] + realtimeArray[8];

    let tx = realtimeArray[27] + realtimeArray[9];
    setNetworkRealTime(realtime);
  });

  const [networkHours, setNetworkHours] = useState("");
  ipcRenderer.on("networkHours", (event, arg) => {
    let h = arg.replace("/\t/g", "aaa");

    setNetworkHours(h);
  });
  const cpuData = {
    labels: ["used", "unuse"],
    datasets: [
      {
        label: "# of Votes",
        data: [cpuUsage, 100 - cpuUsage],
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(0, 0, 0, 0)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
        borderWidth: 1,
      },
    ],
  };
  const MemoryData = {
    labels: ["used", "unuse"],
    datasets: [
      {
        label: "# of Votes",
        data: [MemoryUsage, 100 - MemoryUsage],
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(0, 0, 0, 0)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
        borderWidth: 1,
      },
    ],
  };
  const DiskData = {
    labels: ["used", "unuse"],
    datasets: [
      {
        label: "# of Votes",
        data: [DiskUsage, 100 - DiskUsage],
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(0, 0, 0, 0)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
        borderWidth: 1,
      },
    ],
  };
  const options = {
    responsive: false,
  };

  return (
    <div className="ServerMonitoring">
      <h1>ServerMonitoring</h1>

      <ServerInfo />
      <div className="badgeContainer">
        <div className="badgeShort">
          <Doughnut
            data={cpuData}
            options={options}
            style={{ width: "20vw", height: "auto" }}
          />
          <div>{cpuUsage}</div>
        </div>
        <div className="badgeShort">
          <Doughnut
            data={MemoryData}
            options={options}
            style={{ width: "20vw", height: "auto" }}
          />
          <div className="badge-content"> {MemoryUsage}</div>
        </div>
        <div className="badgeShort">
          <Doughnut
            data={DiskData}
            options={options}
            style={{ width: "20vw", height: "auto" }}
          />
          <div className="badge-content">{DiskUsage}</div>
        </div>
      </div>

      <div>실시간 트래픽 : {networkRealTime}</div>
      <div>하루 트래픽 : {networkHours}</div>
    </div>
  );
}
