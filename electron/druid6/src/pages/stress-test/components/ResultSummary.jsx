export default function ResultSummary() {
  return (
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
  );
}
