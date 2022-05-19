import logo from "../../static/images/icon.png";
import "./Intro.scss";
import FileUpload from "../../components/FileUpload";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateReduxInfo } from "../../pages/server-monitoring/updateInfo";
import { updateMenuTitle } from "../../redux/actions";
import ServerInfo from "../../components/ServerInfo";

export default function Intro() {
  function setSheenPosition(xRatio, yRatio) {
    // This creates a "distance" up to 400px each direction to offset the sheen
    const xOffset = 1 - (xRatio - 0.5) * 800;
    const yOffset = 1 - (yRatio - 0.5) * 800;
    const target = document.getElementsByClassName("intro-logo")[0];
    target.style.setProperty("--sheenX", `${xOffset}px`);
    target.style.setProperty("--sheenY", `${yOffset}px`);
  }

  function handleMouseMove(event) {
    const height = window.innerHeight;
    const width = window.innerWidth;
    // Creates angles of (-20, -20) (left, bottom) and (20, 20) (right, top)
    const yAxisDegree = (event.pageX / width) * 60 - 20;
    const xAxisDegree = (event.pageY / height) * -1 * 60 + 20;
    const target = document.getElementsByClassName("intro-logo")[0];
    target.style.transform = `rotateY(${yAxisDegree}deg) rotateX(${xAxisDegree}deg)`;
    // Set the sheen position
    setSheenPosition(event.pageX / width, event.pageY / width);
  }

  const { serverInfo } = useSelector((state) => ({
    serverInfo: state.serverInfo,
  }));
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(updateMenuTitle("Druid6"));
  }, []);

  if (serverInfo.osInfo !== "" && !serverInfo.isConnect) {
    window.ipcRenderer.send("AllowInstall", "allow");
    updateReduxInfo({
      key: "isConnect",
      value: true,
    });
  }
  return (
    <div className="Intro" onMouseMove={handleMouseMove}>
      <header className="Intro-header">
        <div className="perspective-container">
          <img src={logo} className="intro-logo" alt="logo" />
        </div>
        <div className="product-introduction">
          <span>최고의 애플리케이션 모니터링 솔루션,</span>
          <span className="druid6-logo">Druid6</span> <span>입니다.</span>
        </div>
        <a
          className="Intro-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn Druid6
        </a>
        {serverInfo.osInfo === "" ? (
          <FileUpload />
        ) : (
          <div className="server-info">
            <ServerInfo />
          </div>
        )}
      </header>
    </div>
  );
}
