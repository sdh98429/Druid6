import { useState } from 'react';


export default function HostInput() {
  //const [filePath, setFilePath] = useState('');

  const [hostInfo, setHostInfo] = useState({
    hostName: "",
    userName: "",
    filePath: "",
  });

  console.log(hostInfo);
  const onChangeHostInfo = (e) => {
    console.log(e);
    setHostInfo({
        ...hostInfo,
        [e.target.name] : e.target.value,
    });
  };

  return (
    <div>
      <input id="hostname" name="hostName" onChange={onChangeHostInfo}/> 
      <input id="username" name="userName" onChange={onChangeHostInfo}/>
     
    </div>
  );
}
