import { useState } from "react";
import "./ServerMonitoring.scss";
import ServerInfo from "../../components/ServerInfo";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateMenuTitle } from "../../redux/actions";

export default function ServerMonitoring() {
  ChartJS.register(ArcElement, Tooltip, Legend);

  const [cpuUsage, setCpuUsage] = useState("");
  window.ipcRenderer.on("cpu", (event, arg) => {
    setCpuUsage(arg);
  });

  const [DiskUsage, setDiskUsage] = useState("");
  window.ipcRenderer.on("disk", (event, arg) => {
    setDiskUsage(arg);
  });

  const [MemoryUsage, setMemoryUsage] = useState("");
  window.ipcRenderer.on("memory", (event, arg) => {
    setMemoryUsage(arg);
  });

  const cpuData = {
    labels: ["used", "unuse"],
    datasets: [
      {
        label: "# of Votes",
        data: [cpuUsage, 100 - cpuUsage],
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
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
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
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
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
        borderWidth: 1,
      },
    ],
  };
  const options = {
    maintainAspectRatio: false,
    responsive: true,
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateMenuTitle("서버 모니터링"));
  }, []);

  return (
    <div className="ServerMonitoring">
      <div className="server-info">
        <ServerInfo />
      </div>
      <div className="badge-container">
        <div className="badge-short">
          <div className="badge-title">CPU 사용량</div>
          <div className="doughnut">
            <Doughnut className="canvas" data={cpuData} options={options} />
          </div>
          <div className="badge-content">
            {cpuUsage}
            {cpuUsage ? "%" : ""}
          </div>
        </div>
        <div className="badge-short">
          <div className="badge-title">RAM 사용량</div>
          <div className="doughnut">
            <Doughnut className="canvas" data={MemoryData} options={options} />
          </div>
          <div className="badge-content">
            {MemoryUsage}
            {MemoryUsage ? "%" : ""}
          </div>
        </div>
        <div className="badge-short">
          <div className="badge-title">DISK 사용량</div>
          <div className="doughnut">
            <Doughnut className="canvas" data={DiskData} options={options} />
          </div>
          <div className="badge-content">
            {DiskUsage}
            {DiskUsage ? "%" : ""}
          </div>
        </div>
      </div>
    </div>
  );
}
