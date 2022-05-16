export default function CoreValue({ value, valueTitle, onClick }) {
  return (
    <div className="coreValue" onClick={onClick}>
      <div className="coreValueTitle">{valueTitle}</div>
      <div className="coreValueBody">{`${value.displayValue}`}</div>
    </div>
  );
}
