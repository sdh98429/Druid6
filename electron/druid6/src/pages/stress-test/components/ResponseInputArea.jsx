// redux
import { useSelector, useDispatch } from "react-redux";
import {
  updateStressTestResponse,
  updateStressTestInputs,
} from "../../../redux/actions";

// mui
import "./ResponseInputArea.scss";
// components
import MyInput from "./MyInput";
import { useState } from "react";
// mui
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

export default function ResponseInputArea() {
  const dispatch = useDispatch();
  const { stressTestInputs } = useSelector((state) => ({
    stressTestInputs: state.stressTestInputs,
  }));

  const saveResponse = () => {
    if (stressTestInputs.savedResponseUnit) {
      dispatch(updateStressTestResponse(stressTestInputs.savedResponseUnit));
      dispatch(updateStressTestInputs({ key: "savedResponseUnit", value: "" }));
    } else {
      alert("공백이 아닌 값을 입력해주세요.");
    }
  };

  const responseList = stressTestInputs.savedResponse.map((response, index) => (
    <Box key={index} fullWidth mb={2}>
      <FormControl size="small">
        <InputLabel htmlFor="component-outlined">
          Response to capture
        </InputLabel>
        <OutlinedInput
          id="component-outlined-disabled"
          value={response}
          label="Response to capture"
          sx={{
            width: "20vw",
            background: "#ededed",
          }}
          disabled
        />
      </FormControl>
    </Box>
  ));

  const capturedResponseList = stressTestInputs.savedResponse.map(
    (response, index) => (
      <Box key={index} fullWidth mb={2}>
        <FormControl size="small">
          <InputLabel htmlFor="component-outlined">Saved as</InputLabel>
          <OutlinedInput
            id="component-outlined-disabled"
            value={"$." + response}
            label="Saved as"
            sx={{
              width: "20vw",
              background: "#ededed",
            }}
            disabled
          />
        </FormControl>
      </Box>
    )
  );

  return (
    <div className="ResponseInputArea">
      <div className="wrapper left-wrapper">
        {responseList}
        <MyInput
          width={"20vw"}
          title={"Response to capture"}
          param={"savedResponseUnit"}
          abled={true}
          className="my"
        />
      </div>
      <div className="divider" />
      <div className="wrapper right-wrapper">
        {capturedResponseList}
        <Box fullWidth mb={2}>
          <FormControl size="small">
            <InputLabel htmlFor="component-outlined">Saved as</InputLabel>
            <OutlinedInput
              id="component-outlined-disabled"
              value={"$." + stressTestInputs.savedResponseUnit}
              label="Saved as"
              sx={{
                width: "20vw",
                background: "#ededed",
              }}
              disabled
            />
          </FormControl>
        </Box>
        <Fab
          size="small"
          color="success"
          aria-label="add"
          onClick={() => saveResponse()}
        >
          <AddIcon />
        </Fab>
      </div>
    </div>
  );
}
