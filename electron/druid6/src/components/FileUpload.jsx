import { useState } from "react";
import { Button, TextField } from "@mui/material";
import { updateReduxInfo } from "../pages/server-monitoring/updateInfo";
import UploadFileIcon from "@mui/icons-material/UploadFile";
export default function FileUpload() {
  const { ipcRenderer } = window.require("electron");

  const openFile = () => {
    ipcRenderer.send("OpenFile", "open");
  };

  const allowInstall = () => {
    ipcRenderer.send("AllowInstall", "allow");
  };

  const [filePath, setFilePath] = useState("");
  ipcRenderer.on("filePath", (event, arg) => {
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
    ipcRenderer.send("ConnectSSH", hostInfo);
  };
  ipcRenderer.on("processInfo", (event, arg) => {
    console.log("잘들어와요");
    updateReduxInfo({
      key: "processInfo",
      value: arg,
    });
  });

  ipcRenderer.on("osInfo", (event, arg) => {
    updateReduxInfo({
      key: "osInfo",
      value: arg,
    });
  });

  ipcRenderer.on("ramInfo", (event, arg) => {
    updateReduxInfo({
      key: "ramInfo",
      value: arg,
    });
  });

  ipcRenderer.on("systemInfo", (event, arg) => {
    updateReduxInfo({
      key: "systemInfo",
      value: arg,
    });
  });

  ipcRenderer.on("kernelVersion", (event, arg) => {
    updateReduxInfo({
      key: "kernelVersion",
      value: arg,
    });
  });

  ipcRenderer.on("kernelRelease", (event, arg) => {
    updateReduxInfo({
      key: "kernelRelease",
      value: arg,
    });
  });
  return (
    <div>
      <TextField
        id="hostname"
        name="hostname"
        label="hostname"
        variant="outlined"
        onChange={onChangeHostInfo}
      />
      <TextField
        id="username"
        name="username"
        label="username"
        variant="outlined"
        onChange={onChangeHostInfo}
      />
      <Button startIcon={<UploadFileIcon />} onClick={openFile}>
        pem키 등록해주세요
      </Button>
      <div id="filePath" name="filePath">
        <TextField
          id="outlined-read-only-input"
          label="File Path"
          value={filePath}
          size="small"
          InputProps={{
            readOnly: true,
          }}
        />{" "}
      </div>

      <Button variant="contained" onClick={connectSSH}>
        접속
      </Button>
      <Button onClick={allowInstall}>접속허가</Button>
    </div>
    //버튼 클릭하면 ConnectSSH 접속
  );
}
