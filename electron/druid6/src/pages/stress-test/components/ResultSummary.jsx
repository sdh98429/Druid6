import "./ResultSummary.scss";
export default function ResultSummary({ stressTestResult, latencies }) {
  const { vuserCount, scenarioCount, status } = stressTestResult;

  const { totalLatencies, latencyAvg, minLatency, maxLatency, p95, p99 } =
    latencies;

  const requestFail =
    Object.values(status).reduce(function add(sum, currValue) {
      return sum + currValue;
    }, 0) - status[2];

  // 여기부터

  return (
    <div className="badgeSummary">
      <div className="badge-title">Test Summary</div>
      <div className="divider"></div>
      <div className="summary align-left">
        <div className="cell">
          Virtual Users: <strong>{vuserCount}</strong>
        </div>
        <div className="cell">
          Scenarios: <strong>{scenarioCount}</strong>
        </div>
        <div className="cell">
          Total request: <strong>{requestFail + status[2]}</strong>
        </div>
        <div className="cell">
          Request success: <strong>{status[2]}</strong>
        </div>
        <div className="cell">
          Request fail: <strong>{requestFail}</strong>
        </div>
      </div>

      <div className="status align-left">
        <div className="cell">
          Status 1xx: <strong>{status[1]}</strong>
        </div>
        <div className="cell">
          Status 2xx: <strong>{status[2]}</strong>
        </div>
        <div className="cell">
          Status 3xx: <strong>{status[3]}</strong>
        </div>
        <div className="cell">
          Status 4xx: <strong>{status[4]}</strong>
        </div>
        <div className="cell">
          Status 5xx: <strong>{status[5]}</strong>
        </div>
      </div>
      <div className="response-statistic align-left">
        <div className="cell">
          Total latency: <strong>{totalLatencies} ms</strong>
        </div>
        <div className="cell">
          Latency average: <strong>{latencyAvg} ms</strong>
        </div>
        <div className="cell">
          Min latency: <strong>{minLatency} ms</strong>
        </div>
        <div className="cell">
          Max latency: <strong>{maxLatency} ms</strong>
        </div>
        <div className="cell">
          p95: <strong>{p95} ms</strong>
        </div>
        <div className="cell">
          p99: <strong>{p99} ms</strong>
        </div>
      </div>
    </div>
  );
}
