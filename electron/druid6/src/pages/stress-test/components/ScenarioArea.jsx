//mui
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
// redux
import { useSelector } from "react-redux";

// scss
import "./ScenarioArea.scss";

export default function ScenarioArea() {
  const { stressTestScenarios } = useSelector((state) => ({
    stressTestScenarios: state.stressTestScenarios,
  }));

  const scenarioList = stressTestScenarios.map((scenario, index) => (
    <div className="scenario-list-item" key={index}>
      <div className="scenario-item-area">
        <div className="method-area">{scenario.method}</div>
        <div className="scenario-name-area">{scenario.scenarioTitle}</div>
      </div>
    </div>
  ));

  return (
    <div className="ScenarioArea">
      <div className="scenario-title-area">Scenario List</div>
      {scenarioList}
    </div>
  );
}
