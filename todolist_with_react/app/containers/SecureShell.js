export const sshEmitter = new EventEmitter 

export default class SecureShell {
  static sshCommand(command, ip, port, user, pass, key) {
    let dataOut = '<p>'; 
    let errOut; 
    let connectObject = {
      host: ip,
      user: user,
      privateKey: fs.readFileSync(`${process.cwd()}/keys/${key}`)
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
