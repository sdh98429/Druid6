const { readFileSync } = require('fs');

const { Client } = require('ssh2');

const conn = new Client();
conn.on('ready', () => {
  console.log('Client :: read23y');
  conn.exec(`mpstat | tail -1 | awk '{print 100-$NF}'
  `, (err, stream) => {
    if (err) throw err;
    stream.on('close', (code, signal) => {
      console.log('Stream :: close :: code: ' + code + ', signal: ' + signal);
      conn.end();
    }).on('data', (data) => {
      console.log('STDOUT: ' + data);
    }).stderr.on('data', (data) => {
      console.log('STDERR: ' + data);
    });
  });
}).connect({
        host: "3.38.101.66",
        username: "ubuntu",
        port: 22,
        privateKey : readFileSync('./K6S204T.pem'),
    });


