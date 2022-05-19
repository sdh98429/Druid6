import "./ResultContents.scss";
import { useState } from "react";
import CoreValue from "./CoreValue";
import coreValues from "../../static/coreValues";

export default function ResultContents({ performanceReport }) {
  const [coreValueDetail, setCoreValueDetail] = useState(
    "각 메트릭을 클릭하면 세부 설명을 볼 수 있습니다."
  );
  const handleClick = (detail) => {
    console.log("click");
    console.log(detail);
    setCoreValueDetail(detail);
  };

  return (
    <div className="api-detail">
      <div className="represent">
        <ul className="core-value-group">
          {Object.entries(coreValues).map(
            ([key, { valueTitle, valueDescription }]) => {
              return (
                <CoreValue
                  value={performanceReport[key]}
                  valueTitle={valueTitle}
                  onClick={() => handleClick(valueDescription)}
                />
              );
            }
          )}
        </ul>
      </div>
      <div className="description badge no-hover">
        <div>{`${coreValueDetail}`}</div>
      </div>
    </div>
  );
}
