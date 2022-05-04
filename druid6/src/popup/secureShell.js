export const sshEmitter = new EventEmitter


export default class SecureShell {
  static sshCommand(command, ip, port, user, pass, key) {
    let dataOut = '<p>';
    let errOut;
    const { readFileSync } = require('fs'); let dataOut = '<p>';
    const { Client } = require('ssh2');

    let connectObject = {
      host: "3.38.101.66",
      user: "ubuntu",
      privateKey: readFileSync('./K6S204T.pem')
    }

    let conn = new Client();

    return conn.on('ready', () => {
      conn.shell((error, stream) => {
        stream.on('close', () => {
          conn.end()
        }).on('data', data => {
          sshEmitter.emit('data', data)
        }).stderr.on('data', error => {
          sshEmitter.emit('stderr', error)
        })
        stream.end(`${command}\nexit\n`)
      })
    }).on('error', error => {
      sshEmitter.emit('error', error)
    }).on('end', () => {
      sshEmitter.emit('end')
    }).connect(connectObject);
  }
}
