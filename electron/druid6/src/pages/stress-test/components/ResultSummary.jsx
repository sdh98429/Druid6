import "./ResultSummary.scss";
export default function ResultSummary() {
  return (
    <div className="badgeSummary">
      <div className="badge-title">Test Summary</div>
      <div className="summary align-left">
        <div className="cell">
          Virtual Users: <strong>test{}</strong>
        </div>
        <div className="cell">
          Scenarios: <strong>test{}</strong>
        </div>
        <div className="cell">
          Total request: <strong>test{}</strong>
        </div>
        <div className="cell">
          Request success: <strong>4</strong>
        </div>
        <div className="cell">
          Request fail: <strong>test{}</strong>
        </div>
      </div>

      <div className="status align-left">
        <div className="cell">
          Status 1xx: <strong>test{}</strong>
        </div>
        <div className="cell">
          Status 2xx: <strong>test{}</strong>
        </div>
        <div className="cell">
          Status 3xx: <strong>test{}</strong>
        </div>
        <div className="cell">
          Status 4xx: <strong>test{}</strong>
        </div>
        <div className="cell">
          Status 5xx: <strong>test{}</strong>
        </div>
      </div>
      <div className="response-statistic align-left">
        <div className="cell">
          Total latency: <strong>test{}</strong>
        </div>
        <div className="cell">
          Latency average: <strong>test{}</strong>
        </div>
        <div className="cell">
          Min latency: <strong>test{}</strong>
        </div>
        <div className="cell">
          Max latency: <strong>test{}</strong>
        </div>
        <div className="cell">
          p95: <strong>test{}</strong>
        </div>
        <div className="cell">
          p99: <strong>test{}</strong>
        </div>
      </div>
    </div>
  );
}
