import "./ResultChart.scss";
import ResponseStatisticChart from "../ResponseStatisticChart";

export default function ResultChart({ latencies }) {
  return (
    <div className="badgeBar">
      <div className="badge-title">Response Time Result</div>
      <ResponseStatisticChart latencies={latencies} />
      <div className="live-traffic-charts"></div>
    </div>
  );
}
