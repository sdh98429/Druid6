import "./CoreValue.scss";

export default function CoreValue({ value, valueTitle, onClick }) {
  return (
    <div className="coreValue badge" onClick={onClick}>
      <div className="core-value-title">{valueTitle}</div>
      <div className="core-value-body">{`${value.displayValue}`}</div>
    </div>
  );
}
