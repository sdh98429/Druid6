import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { updateMenuTitle } from "../../redux/actions";
import "./StressTestResult.scss";
import ResultSummary from "./components/ResultSummary";
import ResultIcon from "./components/ResultIcon";
import ResultChart from "./components/ResultChart";
export default function StressTestResult() {
  const dispatch = useDispatch();
  const { stressTestResult } = useSelector((state) => ({
    stressTestResult: state.stressTestResult,
  }));
  const { responseLatencies } = stressTestResult;

  //latencies

  const totalLatencies = Object.values(responseLatencies).reduce(function add(
    sum,
    currValue
  ) {
    return sum + currValue;
  },
  0);

  const latencyAvg = Math.round(totalLatencies / responseLatencies.length);
  const minLatency = Math.min.apply(Math, responseLatencies);
  const maxLatency = Math.max.apply(Math, responseLatencies);
  responseLatencies.sort(function (a, b) {
    return a - b;
  });
  const p95 = responseLatencies[Math.floor(responseLatencies.length * 0.95)];
  const p99 = responseLatencies[Math.floor(responseLatencies.length * 0.99)];

  const latencies = {
    totalLatencies,
    latencyAvg,
    minLatency,
    maxLatency,
    p95,
    p99,
  };

  useEffect(() => {
    dispatch(updateMenuTitle("시나리오 테스트 결과"));
  }, []);

  return (
    <div className="StressTestResult">
      <div className="badgeContainer">
        <ResultIcon status={stressTestResult.status} />
        <ResultChart latencies={latencies} />
      </div>
      <div className="badgeContainer">
        <ResultSummary
          stressTestResult={stressTestResult}
          latencies={latencies}
        />
      </div>
    </div>
  );
}
