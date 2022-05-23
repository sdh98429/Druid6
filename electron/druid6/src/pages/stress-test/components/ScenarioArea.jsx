import { useState } from "react";
//mui
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
// redux
import { useSelector, useDispatch } from "react-redux";
import { replaceStressTestScenarios } from "../../../redux/actions";

// scss
import "./ScenarioArea.scss";

export default function ScenarioArea() {
  const dispatch = useDispatch();
  const { stressTestScenarios } = useSelector((state) => ({
    stressTestScenarios: state.stressTestScenarios,
  }));
  const [isHoveredScenario, SetIsHoveredScenario] = useState({});

  const handleMouseOver = (e, index) => {
    SetIsHoveredScenario({
      [index]: 1,
    });
  };

  const handleMouseOut = (e, index) => {
    SetIsHoveredScenario({
      [index]: 0,
    });
  };

  const deleteScenario = (e, index) => {
    let newScenarios = [...stressTestScenarios];
    newScenarios.splice(index, 1);
    dispatch(replaceStressTestScenarios(newScenarios));
    SetIsHoveredScenario({
      [index]: 0,
    });
  };

  const scenarioList = stressTestScenarios.map((scenario, index) => (
    <div
      className="scenario-list-item"
      key={index}
      onMouseOver={(e) => {
        handleMouseOver(e, index);
      }}
      onMouseOut={(e) => {
        handleMouseOut(e, index);
      }}
    >
      <div className="scenario-item-area">
        <div
          className={
            "method-area " + (scenario.method === "GET" && "green-text")
          }
        >
          {scenario.method}
        </div>
        <div className="scenario-name-area">{scenario.scenarioTitle}</div>
        {isHoveredScenario[index] === 1 && (
          <RemoveCircleOutlineIcon
            className="remove-icon"
            onClick={(e) => deleteScenario(e, index)}
          />
        )}
      </div>
    </div>
  ));

  return (
    <div className="ScenarioArea">
      <div className="scenario-title-area">Scenario List</div>
      <div className="divider"></div>
      {scenarioList}
    </div>
  );
}
