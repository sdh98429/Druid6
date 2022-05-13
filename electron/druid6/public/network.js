const network = (event,hostInfo,privateKeyPath) => {
    const Client = require('electron-ssh2').Client;
    
    const conn = new Client();
    
    conn.on('ready', () => {
      console.log('Client :: ready2');
      setInterval(function (){
        conn.exec(`vnstat -h`
        , (err, stream) => {
          if (err) throw err;
          stream.on('close', (code, signal) => {
            //console.log('Stream :: close :: code: ' + code + ', signal: ' + signal);
            //conn.end();
          }).on('data', (data) => {
            
            event.reply('networkHours',data.toString());
            console.log( data.toString());
          }).stderr.on('data', (data) => {
            console.log('STDERR: ' + data);
          });
        });
      },5000)
    
      setTimeout(function (){
        conn.exec(`vnstat -l -i eth0`
        , (err, stream) => {
          if (err) throw err;
          stream.on('close', (code, signal) => {
            //console.log('Stream :: close :: code: ' + code + ', signal: ' + signal);
            //conn.end();
          }).on('data', (data) => {
            
            event.reply('networkRealTime',data.toString());
            console.log( data.toString());
          }).stderr.on('data', (data) => {
            console.log('STDERR: ' + data);
          });
        });
      },0)
      
    }).connect({
    host: hostInfo.hostname,
    port: 22,
    username: hostInfo.username,
    privateKey: require('fs').readFileSync(privateKeyPath)
  });
}

module.exports = network;
