const sshClient = (event,hostInfo,privateKeyPath) => {
    const Client = require('electron-ssh2').Client;
    let resultCpu;
    let resultDisk;
    let resultMemory;
    let processInfo;
    let osInfo;
    let ramInfo;
    let kernelRelease;
    let kernelVersion;
    let systemInfo;
    const conn = new Client();
  
    conn.on('ready', () => {
      setTimeout(function (){
        conn.exec(`cat /proc/cpuinfo | grep "model name" | head -1`
        , (err, stream) => {
          if (err) throw err;
          stream.on('close', (code, signal) => {
          }).on('data', (data) => {
            processInfo=data;
            event.reply('processInfo',processInfo.toString());
          }).stderr.on('data', (data) => {
            console.log('STDERR: ' + data);
          });
        });
      },0)
      setTimeout(function (){
        conn.exec(`uname -s`
        , (err, stream) => {
          if (err) throw err;
          stream.on('close', (code, signal) => {
          }).on('data', (data) => {
            osInfo=data;
            event.reply('osInfo',osInfo.toString());
          }).stderr.on('data', (data) => {
            console.log('STDERR: ' + data);
          });
        });
      },0)
      setTimeout(function (){
        conn.exec(`free -m | grep "Mem" | awk '{print $2}'
        `
        , (err, stream) => {
          if (err) throw err;
          stream.on('close', (code, signal) => {
          }).on('data', (data) => {
            ramInfo=data;   
            event.reply('ramInfo',ramInfo.toString().substr(0,2));
          }).stderr.on('data', (data) => {
            console.log('STDERR: ' + data);
          });
        });
      },0)
      setTimeout(function (){
        conn.exec(`uname -r`
        , (err, stream) => {
          if (err) throw err;
          stream.on('close', (code, signal) => {
          }).on('data', (data) => {
            kernelRelease=data;
            event.reply('kernelRelease',kernelRelease.toString());
          }).stderr.on('data', (data) => {
            console.log('STDERR: ' + data);
          });
        });
      },0)
      setTimeout(function (){
        conn.exec(`uname -v`
        , (err, stream) => {
          if (err) throw err;
          stream.on('close', (code, signal) => {
          }).on('data', (data) => {
            kernelVersion=data;
            event.reply('kernelVersion',kernelVersion.toString());
          }).stderr.on('data', (data) => {
            console.log('STDERR: ' + data);
          });
        });
      },0)
      setTimeout(function (){
        conn.exec(`uname -m`
        , (err, stream) => {
          if (err) throw err;
          stream.on('close', (code, signal) => {
          }).on('data', (data) => {
            systemInfo=data;
            event.reply('systemInfo',systemInfo.toString());
          }).stderr.on('data', (data) => {
            console.log('STDERR: ' + data);
          });
        });
      },0)
      setInterval(function (){
        conn.exec(`free -m | grep Mem | awk '{print (($2-$6)/$2)*100}'`
        , (err, stream) => {
          if (err) throw err;
          stream.on('close', (code, signal) => {
          }).on('data', (data) => {
            resultMemory=data;
            event.reply('memory',resultMemory.toString());
          }).stderr.on('data', (data) => {
            console.log('STDERR: ' + data);
          });
        });
      },3000)
      setInterval(function (){
        conn.exec(`df . | grep /dev | awk '{print $5}'`
        , (err, stream) => {
          if (err) throw err;
          stream.on('close', (code, signal) => {
          }).on('data', (data) => {
            resultDisk=data;
            event.reply('disk',resultDisk.toString().substr(0,resultDisk.toString().length-2));
          }).stderr.on('data', (data) => {
            console.log('STDERR: ' + data);
          });
        });
      },3000)
      setInterval(function (){
        conn.exec(`top -b -n 1 | grep -Po '[0-9.]+ id' | head -1 | awk '{print 100-$1}'`
        , (err, stream) => {
          if (err) throw err;
          stream.on('close', (code, signal) => {
          }).on('data', (data) => {
            resultCpu=data;
            event.reply('cpu',resultCpu.toString());
          }).stderr.on('data', (data) => {
            console.log('STDERR: ' + data);
          });
        });
      },3000)   
    }).connect({
    host: hostInfo.hostname,
    port: 22,
    username: hostInfo.username,
    privateKey: require('fs').readFileSync(privateKeyPath)
  });
}

module.exports = sshClient;
