import ws from 'ws'

export default function (server) {
  const wss = new ws.Server({ server })

  wss.on('connection', (socket, req) => {
    console.log(req)

    socket.on('message', data => console.log(data))
    socket.on('close', (conn, code, reason) => console.log('Exit'))
  })
}
