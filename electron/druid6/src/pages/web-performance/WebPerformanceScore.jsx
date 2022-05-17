import ScoreChart from "./ScoreChart";

export default function WebPerformanceScore({ performanceScore, Color }) {
  return (
    <div className="coreValueBody" style={{ color: `${Color}` }}>
      {performanceScore}
      <ScoreChart performanceScore={performanceScore} />
    </div>
  );
}
