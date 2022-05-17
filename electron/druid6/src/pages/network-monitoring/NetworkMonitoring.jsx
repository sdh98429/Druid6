import DailyTrafficChart from "./DailyTrafficChart";
import RxTxChart from "./RxTxChart";
import LiveTrafficChart from "./LiveTrafficChart";
// import RealTimeChart from "./RealTimeChart";

import "../../styles/badge.scss";
import "./NetworkMonitoring.scss";

export default function NetworkMonitoring() {
  return (
    <div className="NetworkMonitoring">
      <div className="badge live-traffic">
        <div className="badge-title">
          실시간 트래픽
          <div className="live-traffic-charts">
            <RxTxChart />
            <LiveTrafficChart />
            {/* <RealTimeChart /> */}
          </div>
        </div>
      </div>
      <div className="badge daily-traffic">
        <div className="badge-title">
          일별 트래픽
          <DailyTrafficChart />
        </div>
      </div>
    </div>
  );
}
