const sshClient = (event,hostInfo,privateKeyPath) => {
    const Client = require('electron-ssh2').Client;
    let resultCpu;
    let resultDisk;
    let resultMemory;
    const conn = new Client();
  
    conn.on('ready', () => {
      console.log('Client :: ready2');
      setInterval(function (){
        conn.exec(`free -m | grep Mem | awk '{print (($2-$6)/$2)*100}'`
        , (err, stream) => {
          if (err) throw err;
          stream.on('close', (code, signal) => {
            //console.log('Stream :: close :: code: ' + code + ', signal: ' + signal);
            //conn.end();
          }).on('data', (data) => {
            resultMemory=data;
            console.log('MEMORY: ' + data);
          }).stderr.on('data', (data) => {
            console.log('STDERR: ' + data);
          });
        });
      },1000)
      setInterval(function (){
        conn.exec(`df . | grep /dev | awk '{print $5}'`
        , (err, stream) => {
          if (err) throw err;
          stream.on('close', (code, signal) => {
            //console.log('Stream :: close :: code: ' + code + ', signal: ' + signal);
            //conn.end();
          }).on('data', (data) => {
            
            resultDisk=data;
            console.log('DISK: ' + data);
          }).stderr.on('data', (data) => {
            console.log('STDERR: ' + data);
          });
        });
      },1000)
      setInterval(function (){
        conn.exec(`top -b -n 1 | grep -Po '[0-9.]+ id' | head -1 | awk '{print 100-$1}'`
        , (err, stream) => {
          if (err) throw err;
          stream.on('close', (code, signal) => {
            //console.log('Stream :: close :: code: ' + code + ', signal: ' + signal);
            //conn.end();
          }).on('data', (data) => {
            resultCpu=data;
            event.reply('reply',resultCpu.toString());
            
            console.log('CPU: ' + data);
          }).stderr.on('data', (data) => {
            console.log('STDERR: ' + data);
          });
        });
      },1000)
    }).connect({
    host: '3.38.101.66',
    port: 22,
    username: 'ubuntu',
    privateKey: require('fs').readFileSync(privateKeyPath)
  });
}

module.exports = sshClient;
