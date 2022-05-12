export default function ServerInfo({
  serverInfo: {
    processInfo,
    osInfo,
    ramInfo,
    kernelRelease,
    kernelVersion,
    systemInfo,
    cpu,
    memory,
    disk,
    networkRealTime,
}}) {

  return (
    <div>
      <div>프로세스 정보 : {processInfo}</div>
      <div>운영체제 정보 : {osInfo}</div>
      <div>설치된 램 : {ramInfo} gb</div>
      <div>커널 릴리즈 버젼 : {kernelRelease}</div>
      <div>커널 버젼 : {kernelVersion}</div>
      <div>시스템 종류 : {systemInfo}</div>
      <div>cpu사용량 : {cpu}%</div>
      <div>memory사용량 : {memory}%</div>
      <div>disk 사용량 : {disk}</div> 
      <div>실시간 트래픽 : {networkRealTime}</div>
    </div>
  );
}
