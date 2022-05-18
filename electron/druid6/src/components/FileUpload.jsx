import "./FileUpload.scss";
import { useState } from "react";
import { Button, TextField } from "@mui/material";
import { updateReduxInfo } from "../pages/server-monitoring/updateInfo";
import { updateReduxNetwork } from "../pages/server-monitoring/updateNetwork";
import UploadFileIcon from "@mui/icons-material/UploadFile";
export default function FileUpload() {
  const openFile = () => {
    window.ipcRenderer.send("OpenFile", "open");
  };

  const allowInstall = () => {
    window.ipcRenderer.send("AllowInstall", "allow");
  };

  const [filePath, setFilePath] = useState("");
  window.ipcRenderer.on("filePath", (event, arg) => {
    setFilePath(arg);
  });

  const [hostInfo, setHostInfo] = useState({
    hostname: "",
    username: "",
    filePath: "",
  });

  const onChangeHostInfo = (e) => {
    console.log(e);
    setHostInfo({
      ...hostInfo,
      [e.target.name]: e.target.value,
    });
  };

  const connectSSH = () => {
    window.ipcRenderer.send("ConnectSSH", hostInfo);
  };
  window.ipcRenderer.on("processInfo", (event, arg) => {
    updateReduxInfo({
      key: "processInfo",
      value: arg,
    });
  });

  window.ipcRenderer.on("osInfo", (event, arg) => {
    updateReduxInfo({
      key: "osInfo",
      value: arg,
    });
  });

  window.ipcRenderer.on("ramInfo", (event, arg) => {
    updateReduxInfo({
      key: "ramInfo",
      value: arg,
    });
  });

  window.ipcRenderer.on("systemInfo", (event, arg) => {
    updateReduxInfo({
      key: "systemInfo",
      value: arg,
    });
  });

  window.ipcRenderer.on("kernelVersion", (event, arg) => {
    updateReduxInfo({
      key: "kernelVersion",
      value: arg,
    });
  });

  window.ipcRenderer.on("kernelRelease", (event, arg) => {
    updateReduxInfo({
      key: "kernelRelease",
      value: arg,
    });
  });
  window.ipcRenderer.on("networkDays", (event, arg) => {
    updateReduxNetwork({
      key: "traffic",
      value: arg,
    });
  });
  return (
    <div className="FileUpload">
      <div className="field-container">
        <TextField
          id="hostname"
          name="hostname"
          label="hostname"
          variant="outlined"
          size="small"
          className="text-field-item"
          onChange={onChangeHostInfo}
        />
        <TextField
          id="username"
          name="username"
          label="username"
          variant="outlined"
          size="small"
          className="text-field-item"
          onChange={onChangeHostInfo}
        />
        <Button
          className="box-item"
          startIcon={<UploadFileIcon />}
          onClick={openFile}
        >
          pem 확장자 업로드
        </Button>
      </div>
      <div id="filePath" name="filePath" className="field-container">
        <TextField
          id="outlined-read-only-input"
          label="File Path"
          value={filePath}
          size="small"
          className="text-field-item"
          InputProps={{
            readOnly: true,
          }}
        />{" "}
        <Button className="box-item" variant="contained" onClick={connectSSH}>
          접속
        </Button>
        <Button className="box-item" onClick={allowInstall}>
          접속허가
        </Button>
      </div>
    </div>
    //버튼 클릭하면 ConnectSSH 접속
  );
}
