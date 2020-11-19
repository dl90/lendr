import WebSocket from 'ws'

export default function (httpsServer) {
  const wsServer = new WebSocket.Server({
    server: httpsServer,
    path: '/live',
    verifyClient: async (info, done) => {
      console.log(info.req.headers.cookie)
    }
  })

  httpsServer.on('upgrade', function upgrade (request, socket, head) {
    // passport.Authenticator(request)
    // console.log(request.headers)

    // authenticate(request, (err, client) => {
    //   if (err || !client) {
    //     socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n')
    //     socket.destroy()
    //     return
    //   }

    //   wss.handleUpgrade(request, socket, head, function done(ws) {
    //     wss.emit('connection', ws, request, client)
    //   })
    // })
  })

  wsServer.on('connection', (ws, req) => {
    // console.log(req.headers.cookie)
    ws.on('message', function (message) {
      console.log('received: %s', message)
    })
    // setInterval(
    //   () => ws.send(`${new Date()}`),
    //   1000
    // )
  })
}

