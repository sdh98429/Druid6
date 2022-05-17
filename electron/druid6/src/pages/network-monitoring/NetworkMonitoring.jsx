import DailyTrafficChart from "./DailyTrafficChart";
import RxTxChart from "./RxTxChart";
import LiveTrafficChart from "./LiveTrafficChart";

import "../../styles/badge.scss";
import "./NetworkMonitoring.scss";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateMenuTitle } from "../../redux/actions";

export default function NetworkMonitoring() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateMenuTitle("네트워크 모니터링"));
  }, []);
  return (
    <div className="NetworkMonitoring">
      <div className="badge live-traffic">
        <div className="badge-title">
          실시간 트래픽
          <div className="live-traffic-charts">
            <RxTxChart />
            <LiveTrafficChart />
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
