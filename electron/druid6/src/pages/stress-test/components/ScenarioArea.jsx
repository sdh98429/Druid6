//mui
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";

// scss
import "./ScenarioArea.scss";

export default function ScenarioArea() {
  return (
    <div className="ScenarioArea">
      <div className="scenario-title-area">Scenario List</div>
      <div className="scenario-list-item">
        <div className="scenario-item-area">
          <div className="method-area">GET</div>
          <div className="scenario-name-area">SIGN UP</div>
        </div>
      </div>
      <div className="scenario-list-item">
        <div className="scenario-item-area">
          <div className="method-area">GET</div>
          <div className="scenario-name-area">LOGIN</div>
        </div>
      </div>
      <div className="scenario-list-item">
        <div className="scenario-item-area">
          <div className="method-area">GET</div>
          <div className="scenario-name-area">GET EMAIL</div>
        </div>
      </div>
      <div className="scenario-list-item">
        <div className="scenario-item-area">
          <div className="method-area">GET</div>
          <div className="scenario-name-area">SOMETHING</div>
        </div>
      </div>
    </div>
  );
}
