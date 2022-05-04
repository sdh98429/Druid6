import React from 'react';

export default function MonitorServer() {
  const handleClickMonitorServer = () => {
    const { readFileSync } = require('fs');
    console.log(readFileSync);
    console.log(readFileSync('./K6S204T.pem'));
  };

  return (
    <div>
      <button onClick={handleClickMonitorServer}>서버 모니터링하기</button>
    </div>
  );
}
