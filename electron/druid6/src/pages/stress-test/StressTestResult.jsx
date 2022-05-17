import "./StressTestResult.scss";
import ResponseStatisticChart from "./ResponseStatisticChart";
export default function StressTestResult() {
  return (
    <div className="StressTestResult">
      <div className="scenarioTestTitle">시나리오 테스트 결과</div>
      <div className="badgeContainer">
        <div className="badgeResult">
          <div className="badge-title">Test result</div>
          <img
            className="resultImage"
            src="images/scenario-test/ok-720.png"
            alt=""
          />
        </div>
        <div className="badgeBar">
          <div className="badge-title">Response Time Result</div>
          <ResponseStatisticChart />
          <div className="live-traffic-charts"></div>
        </div>
      </div>
      <div className="badgeContainer">
        <div className="badgeSummary">
          <div className="badge-title">Test Summary</div>
          <div className="summary">
            <div class="cell">Virtual Users: {}</div>
            <div class="cell">Scenarios: {}</div>
            <div class="cell">Total request: {}</div>
            <div class="cell">Request success: {}</div>
            <div class="cell">Request fail: {}</div>
          </div>

          <div className="status">
            <div class="cell">Status 1xx: {}</div>
            <div class="cell">Status 2xx: {}</div>
            <div class="cell">Status 3xx: {}</div>
            <div class="cell">Status 4xx: {}</div>
            <div class="cell">Status 5xx: {}</div>
          </div>
          <div className="response-statistic">
            <div class="cell">Total latency: {}</div>
            <div class="cell">Latency average: {}</div>
            <div class="cell">Min latency: {}</div>
            <div class="cell">Max latency: {}</div>
            <div class="cell">p95: {}</div>
            <div class="cell">p99: {}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
