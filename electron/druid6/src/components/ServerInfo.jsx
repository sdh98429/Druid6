import { useSelector } from "react-redux";
import "./ServerInfo.scss";

export default function ServerInfo() {
  const { serverInfo } = useSelector((state) => ({
    serverInfo: state.serverInfo,
  }));

  return (
    <div className="ServerInfo">
      <div className="badge no-hover">
        <div className="server-info-title">서버 정보</div>
        <div className="info-container">
          <div className="info-name-box">프로세스 정보</div>
          <div className="info-value-box">{serverInfo.processInfo}</div>
          <div className="info-name-box">운영체제 정보</div>
          <div className="info-value-box">{serverInfo.osInfo}</div>
          <div className="info-name-box">RAM 용량</div>
          <div className="info-value-box">
            {serverInfo.ramInfo} {serverInfo.ramInfo ? "GB" : ""}
          </div>
        </div>
        <div className="info-container">
          <div className="info-name-box">커널 릴리즈 버젼</div>
          <div className="info-value-box">{serverInfo.kernelRelease}</div>
          <div className="info-name-box">커널 버젼</div>
          <div className="info-value-box">{serverInfo.kernelVersion}</div>
          <div className="info-name-box">시스템 종류</div>
          <div className="info-value-box">{serverInfo.systemInfo}</div>
        </div>
      </div>
    </div>
  );
}
