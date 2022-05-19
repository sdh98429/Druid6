const install = (event,hostInfo,privateKeyPath) => {
    const Client = require('electron-ssh2').Client;
    const conn = new Client();
  
    conn.on('ready', () => {
      setTimeout(function (){
        conn.exec(`sudo apt install vnstat`
        , (err, stream) => {
          if (err) throw err;
          stream.on('close', (code, signal) => {
          }).on('data', (data) => {
            event.reply('download',"complete");
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