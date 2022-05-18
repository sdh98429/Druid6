import "./ResultIcon.scss";
export default function ResultIcon({ status }) {
  const checkStatusClear = (status) => {
    const sumStatus = Object.values(status).reduce(function add(
      sum,
      currValue
    ) {
      return sum + currValue;
    },
    0);
    return sumStatus;
  };

  const isAllClear = checkStatusClear(status) === status[2];

  return (
    <div className="badgeResult">
      <div className="badge-title">Test result</div>
      {isAllClear ? (
        <img
          className="resultImage"
          src="images/scenario-test/ok-720.png"
          alt=""
        />
      ) : (
        <img
          className="resultImage"
          src="images/scenario-test/cancel-720.png"
          alt=""
        />
      )}
    </div>
  );
}
