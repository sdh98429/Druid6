// redux
import { useSelector } from "react-redux";
// mui
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
// my js file
import { updateReduxSTInputs } from "../updateInput";

export default function MySelect() {
  const { stressTestInputs } = useSelector((state) => ({
    stressTestInputs: state.stressTestInputs,
  }));

  const handleChangeInput = (e) => {
    updateReduxSTInputs(e);
  };

  return (
    <Box sx={{ width: 120 }}>
      <FormControl fullWidth size="small">
        <InputLabel id="demo-simple-select-label">Method</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          name="method"
          value={stressTestInputs.method}
          label="Age"
          onChange={handleChangeInput}
          sx={{ width: 120 }}
        >
          <MenuItem value={"POST"}>POST</MenuItem>
          <MenuItem value={"GET"}>GET</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
