import "./ResultChart.scss";
import ResponseStatisticChart from "../ResponseStatisticChart";

export default function ResultChart() {
  return (
    <div className="badgeBar">
      <div className="badge-title">Response Time Result</div>
      <ResponseStatisticChart />
      <div className="live-traffic-charts"></div>
    </div>
  );
}
