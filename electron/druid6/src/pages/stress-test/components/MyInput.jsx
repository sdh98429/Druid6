// redux
import { useSelector } from "react-redux";
// mui
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
// my js file
import { updateReduxSTInputs } from "../updateInput";
import "./MyInput.scss";

export default function MyInput({ width, title, param, abled }) {
  const { stressTestInputs } = useSelector((state) => ({
    stressTestInputs: state.stressTestInputs,
  }));

  const handleChangeInput = (e) => {
    updateReduxSTInputs(e);
  };

  return (
    <div>
      <Box fullWidth>
        <FormControl size="small">
          <InputLabel htmlFor="component-outlined">{title}</InputLabel>
          <OutlinedInput
            id="component-outlined-disabled"
            name={param}
            value={stressTestInputs[param]}
            onChange={handleChangeInput}
            label={title}
            disabled={!abled}
            sx={{
              width: width,
              maxWidth: "1030px",
              background: !abled && "#ededed",
            }}
          />
        </FormControl>
      </Box>
    </div>
  );
}
