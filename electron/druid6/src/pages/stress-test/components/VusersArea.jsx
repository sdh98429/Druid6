// mui
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
// scss
import "./VusersArea.scss";

export default function VusersArea({ vusers, setVusers }) {
  return (
    <div className="VusersArea">
      <Box fullWidth>
        <FormControl size="small">
          {/* mui 상에서 현재 문제가 있음 - 와 같은 기호도 추가 가능한 문제. 앞으로 제공할 예정이라고 함*/}
          <InputLabel htmlFor="component-outlined">virtual users</InputLabel>
          <OutlinedInput
            placeholder="10"
            id="component-outlined"
            value={vusers}
            onChange={(e) => setVusers(e.target.value)}
            label="virtual users"
            sx={{ width: 120 }}
            type="number"
          />
        </FormControl>
      </Box>
      <Button
        className="scenario-send-button"
        variant="contained"
        color="success"
        endIcon={<SendIcon />}
        sx={{ width: 120 }}
      >
        SEND
      </Button>
    </div>
  );
}
