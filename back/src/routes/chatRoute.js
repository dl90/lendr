import express from 'express'
import Filter from 'bad-words'
import authCheck from '../middleware/authCheck.js'

const router = express.Router()
const filter = new Filter()
router.use(authCheck)

const onlineUsers = new Map()
const conversation = new Map()

export default function (wsInstance) {
  // const clients = wsInstance.getWss().clients
  wsInstance.getWss().on('connection', (socket, req) => socket.send(JSON.stringify({ senderID: 'Server', message: 'connected' })))

  router.ws('/echo', (ws, req) => {
    onlineUsers.set(req.user.id, ws)
    console.log('online', onlineUsers.keys())

    ws.on('close', () => {
      if (conversation.has(req.user.id)) {
        const otherUsersID = conversation.get(req.user.id)
        const rws = onlineUsers.get(otherUsersID)
        const body = { senderID: 'Server', message: `${req.user.id} has disconnected` }
        rws.send(JSON.stringify(body))
      }

      onlineUsers.delete(req.user.id)
      conversation.delete(req.user.id)
    })
    ws.on('message', msg => {
      const body = JSON.parse(msg)
      body.senderID = req.user.id

      if (onlineUsers.has(body.receiverID)) {
        conversation.set(req.user.id, body.receiverID)
        console.log('conversation', conversation)

        const rws = onlineUsers.get(body.receiverID)
        body.message = filter.clean(body.message)
        rws.send(JSON.stringify(body))
      }
    })
  })

  return router
}
