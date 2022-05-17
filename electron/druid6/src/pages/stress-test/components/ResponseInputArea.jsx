// redux
import { useSelector, useDispatch } from "react-redux";
import { updateStressTestResponse } from "../../../redux/actions";
// mui
import "./ResponseInputArea.scss";
// components
import MyInput from "./MyInput";
import { useState } from "react";

export default function ResponseInputArea() {
  const dispatch = useDispatch();
  const { stressTestInputs } = useSelector((state) => ({
    stressTestInputs: state.stressTestInputs,
  }));

  const saveResponse = () => {
    dispatch(updateStressTestResponse(stressTestInputs.savedResponseUnit));
  };

  return (
    <div className="ResponseInputArea">
      <div className="wrapper left-wrapper">
        <MyInput
          width={300}
          title={"SavedResponse"}
          param={"savedResponseUnit"}
          abled={true}
        />
        <div>savedResponseUnit : {stressTestInputs.savedResponseUnit}</div>
        <div>savedResponse : {stressTestInputs.savedResponse}</div>
        <div>URL : {stressTestInputs.url}</div>
      </div>
      <div className="divider" />
      <div className="wrapper right-wrapper">
        <div className="items captured-response-item">accessToken</div>
        <button onClick={() => saveResponse()}>add</button>
      </div>
    </div>
  );
}
