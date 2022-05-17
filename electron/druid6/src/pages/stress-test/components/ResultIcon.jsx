import "./ResultIcon.scss";
export default function ResultIcon() {
  return (
    <div className="badgeResult">
      <div className="badge-title">Test result</div>
      <img
        className="resultImage"
        src="images/scenario-test/ok-720.png"
        alt=""
      />
    </div>
  );
}
