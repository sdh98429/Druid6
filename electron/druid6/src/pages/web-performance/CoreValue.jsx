export default function CoreValue({
  value,
  valueDescription,
  valueTitle,
  handleClick,
}) {
  return (
    <div className="coreValue" onClick={handleClick}>
      <div className="coreValueTitle">{valueTitle}</div>
      <div className="coreValueBody">{`${value.displayValue}`}</div>
    </div>
  );
}
