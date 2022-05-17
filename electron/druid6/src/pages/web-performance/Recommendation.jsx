import SavingsMsChart from "./SavingsMsChart";

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
    <div className="item container">
      <div>{recommendation.title}</div>
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
  );
}
