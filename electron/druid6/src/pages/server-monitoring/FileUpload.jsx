
export default function FileUpload() {
    const {ipcRenderer} =window.require("electron");
    const openFile = () =>{
        ipcRenderer.send("OpenFile","open");
    }
    return (
        <div>
            <button onClick={openFile}>openFile</button>
        </div>
    );
}
