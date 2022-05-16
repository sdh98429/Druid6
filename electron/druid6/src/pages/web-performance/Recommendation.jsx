export default function Recommendation({ recommendation }) {
  return (
    <div className="item container">
      <div>{recommendation.title}</div>
      <div>차트.js</div>
      <div>
        <span>
          {Math.round(
            (recommendation.details.overallSavingsMs / 1000 + Number.EPSILON) *
              100
          ) / 100}{" "}
          s
        </span>
      </div>
    </div>
  );
}
