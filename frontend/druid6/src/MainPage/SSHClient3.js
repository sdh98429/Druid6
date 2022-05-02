const { readFileSync } = require('fs');

const { Client } = require('ssh2');

const conn = new Client();
conn.on('ready', () => {
  console.log('Client :: ready');
  conn.shell((err, stream) => {
    if (err) throw err;
    stream.on('close', () => {
      console.log('Stream :: close');
      conn.end();
    }).on('data', (data) => {
      console.log('OUTPUT: ' + data);
    });
    stream.end(`mpstat | tail -1 | awk '{print 100-$NF}'\nexit\n`);
  });
}).connect({
        host: "3.38.101.66",
        username: "ubuntu",
        port: 22,
        privateKey : readFileSync('./K6S204T.pem'),
    });


