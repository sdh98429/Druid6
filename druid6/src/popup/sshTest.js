const { readFileSync } = require('fs'); let dataOut = '<p>';
const { Client } = require('ssh2');

let errOut;
let connectObject = {
  host: "3.38.101.66",
  user: "ubuntu",
  port: 22,
  privateKey: readFileSync('./K6S204T.pem')
}

let conn = new Client();

return new Promise((resolve, reject) => {
  conn.on('ready', () => {
    console.log('Client :: ready2');
    conn.shell((err, stream) => {
      if (err) throw err;
      stream.on('close', () => {
        console.log('Stream :: close');
        conn.end();
      }).on('data', (data) => {
        console.log('OUTPUT: ' + data);
      });
      stream.end('free\nexit\n');
    });
  }).on('error', error => {
    reject(error);  // sends reject to redux action when connect fails
  }).on('end', () => {
    resolve(dataOut);  // send a collective string of data that was returned in the shell
  }).connect(connectObject);
});
