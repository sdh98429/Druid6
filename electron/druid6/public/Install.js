const install = (event,hostInfo,privateKeyPath) => {
    const Client = require('electron-ssh2').Client;
    const conn = new Client();
  
    conn.on('ready', () => {
      console.log('Client :: ready2');
      setTimeout(function (){
        conn.exec(`sudo apt install vnstat`
        , (err, stream) => {
          if (err) throw err;
          stream.on('close', (code, signal) => {
            //console.log('Stream :: close :: code: ' + code + ', signal: ' + signal);
            //conn.end();
          }).on('data', (data) => {
           
            event.reply('download',"complete");
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
    
    module.exports = install;