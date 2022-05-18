import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateMenuTitle } from "../../redux/actions";
import "./StressTestResult.scss";
import ResultSummary from "./components/ResultSummary";
import ResultIcon from "./components/ResultIcon";
import ResultChart from "./components/ResultChart";
export default function StressTestResult() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(updateMenuTitle("시나리오 테스트 결과"));
  }, []);

  return (
    <div className="StressTestResult">
      <div className="scenarioTestTitle"></div>
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
