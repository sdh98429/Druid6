import "./ResultSummary.scss";
export default function ResultSummary() {
  return (
    <div className="badgeSummary">
      <div className="badge-title">Test Summary</div>
      <div className="summary align-left">
        <div class="cell">
          Virtual Users: <strong>test{}</strong>
        </div>
        <div class="cell">
          Scenarios: <strong>test{}</strong>
        </div>
        <div class="cell">
          Total request: <strong>test{}</strong>
        </div>
        <div class="cell">
          Request success: <strong>4</strong>
        </div>
        <div class="cell">
          Request fail: <strong>test{}</strong>
        </div>
      </div>

      <div className="status align-left">
        <div class="cell">
          Status 1xx: <strong>test{}</strong>
        </div>
        <div class="cell">
          Status 2xx: <strong>test{}</strong>
        </div>
        <div class="cell">
          Status 3xx: <strong>test{}</strong>
        </div>
        <div class="cell">
          Status 4xx: <strong>test{}</strong>
        </div>
        <div class="cell">
          Status 5xx: <strong>test{}</strong>
        </div>
      </div>
      <div className="response-statistic align-left">
        <div class="cell">
          Total latency: <strong>test{}</strong>
        </div>
        <div class="cell">
          Latency average: <strong>test{}</strong>
        </div>
        <div class="cell">
          Min latency: <strong>test{}</strong>
        </div>
        <div class="cell">
          Max latency: <strong>test{}</strong>
        </div>
        <div class="cell">
          p95: <strong>test{}</strong>
        </div>
        <div class="cell">
          p99: <strong>test{}</strong>
        </div>
      </div>
    </div>
  );
}
