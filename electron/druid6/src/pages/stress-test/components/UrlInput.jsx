// redux
import { useSelector} from "react-redux";
// mui
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
// scss
import './UrlInput.scss'
// my js file
import { updateReduxSTInputs } from "../updateInput";

export default function UrlInput() {
  const { stressTestInputs } = useSelector((state) => ({
    stressTestInputs : state.stressTestInputs
  }))

  const handleChangeInput = (e) => {
    updateReduxSTInputs(e)
  };

  return (
    <div className="UrlInput">
      <Box sx={{ width: 150 }}>
        <FormControl fullWidth size="small">
          <InputLabel id="demo-simple-select-label">Method</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            name="method"
            value={stressTestInputs.method}
            label="Age"
            onChange={handleChangeInput}
          >
            <MenuItem value={"POST"}>POST</MenuItem>
            <MenuItem value={"GET"}>GET</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box sx={{ width: 500}}>
        <FormControl size="small">
          <InputLabel htmlFor="component-outlined">URL</InputLabel>
          <OutlinedInput
            placeholder="URL"
            id="component-outlined"
            name="url"
            value={stressTestInputs.url}
            onChange={handleChangeInput}
            label="URL"
            sx={{ width: 500}}
          />
        </FormControl>
      </Box>
    </div>
  );
}
