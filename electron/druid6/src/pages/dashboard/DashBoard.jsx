import serverMonitoringLogo from "../../static/images/server-monitoring-thumbnail.jpg";
import scenarioTestLogo from "../../static/images/scenario-test-thumbnail.svg";
import webPerformanceTestLogo from "../../static/images/web-performance-test-thumbnail.svg";
import networkMonitoringLogo from "../../static/images/network-monitoring-thumbnail.svg";
import docsLogo from "../../static/images/docs-thumbnail.svg";

import "./DashBoard.scss";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateMenuTitle } from "../../redux/actions";

export default function DashBoard() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(updateMenuTitle("대시보드"));
  }, []);
  return (
    <div className="DashBoard">
      <div className="board-container">
        <Link to="/server-monitoring">
          <div className="badge-basic">
            <div className="badge-title">서버 모니터링</div>

            <img
              src={serverMonitoringLogo}
              className="dashboard-logo-basic"
              alt="logo"
            />
          </div>
        </Link>
        <Link to="/stress-test">
          <div className="badge-basic">
            <div className="badge-title">시나리오 테스트</div>
            <img
              src={scenarioTestLogo}
              className="dashboard-logo-basic"
              alt="logo"
            />
          </div>
        </Link>
        <Link to="/web-performance">
          <div className="badge-basic">
            <div className="badge-title">웹 퍼포먼스 테스트</div>
            <img
              src={webPerformanceTestLogo}
              className="dashboard-logo-basic"
              alt="logo"
            />
          </div>
        </Link>
      </div>

      <div className="board-container">
        <Link to="/network-monitoring" className="a-long">
          <div className="badge-long">
            <div className="badge-title">네트워크 모니터링</div>
            <img
              src={networkMonitoringLogo}
              className="dashboard-logo-long"
              alt="logo"
            />
          </div>
        </Link>
        <Link to="/stress-test">
          <div className="badge-basic">
            <div className="badge-title">Docs</div>
            <img src={docsLogo} className="dashboard-logo-basic" alt="logo" />
          </div>
        </Link>
      </div>
    </div>
  );
}
