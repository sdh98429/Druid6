import { useSelector } from "react-redux";
import "./ServerInfo.scss";

export default function ServerInfo() {
  const { serverInfo } = useSelector((state) => ({
    serverInfo: state.serverInfo,
  }));

  return (
    <div className="ServerInfo">
      <div className="badge noHover">
        <div>프로세스 정보 : {serverInfo.processInfo}</div>
        <div>운영체제 정보 : {serverInfo.osInfo}</div>
        <div>설치된 램 : {serverInfo.ramInfo} gb</div>
        <div>커널 릴리즈 버젼 : {serverInfo.kernelRelease}</div>
        <div>커널 버젼 : {serverInfo.kernelVersion}</div>
        <div>시스템 종류 : {serverInfo.systemInfo}</div>
      </div>
    </div>
  );
}
