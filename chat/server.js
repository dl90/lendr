import express from 'express'
import http from 'http'
import ws from 'ws'

const app = express()
const server = http.createServer(app)
const wss = new ws.Server({ server })

app.use(express.static('public'))

wss.on('connection', (socket, req) => {
  socket.on('error', (e) => console.log(e))
  socket.on('close', () => console.log('Exit'))
  socket.on('message', data => broadcast(socket, data))
})

function broadcast (socket, data) {
  wss.clients.forEach(client => {
    if (client !== socket && client.readyState === ws.OPEN) client.send(data)
  })
}

server.listen(8080, () => console.log('http://localhost:' + server.address().port))
