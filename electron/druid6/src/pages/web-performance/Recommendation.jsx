import SavingsMsChart from "./SavingsMsChart";
import "./Recommendation.scss";

export default function Recommendation({
  recommendation,
  maxOverallSavingsMs,
}) {
  let overallSavingsMs =
    Math.round(
      (recommendation.details.overallSavingsMs / 1000 + Number.EPSILON) * 100
    ) / 100;

  const xScaleMaxValue = maxOverallSavingsMs >= 3 ? maxOverallSavingsMs : 3;
  return (
    <div className="Recommendation">
      <div className="container">
        <div className="item-title">{recommendation.title}</div>
        <div className="item-time">
          <div>
            <SavingsMsChart
              overallSavingsMs={overallSavingsMs}
              xScaleMaxValue={xScaleMaxValue}
            />
          </div>
          <div>
            <span>{overallSavingsMs} s</span>
          </div>
        </div>
      </div>
    </div>
  );
}
