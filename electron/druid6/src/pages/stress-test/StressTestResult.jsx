import "./StressTestResult.scss";
import ResultSummary from "./components/ResultSummary";
import ResultIcon from "./components/ResultIcon";
import ResultChart from "./components/ResultChart";
export default function StressTestResult() {
  return (
    <div className="StressTestResult">
      <div className="scenarioTestTitle">시나리오 테스트 결과</div>
      <div className="badgeContainer">
        <ResultIcon />
        <ResultChart />
      </div>

      <div className="badgeContainer">
        <ResultSummary />
      </div>
    </div>
  );
}
