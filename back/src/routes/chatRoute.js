import express from 'express'
import authCheck from '../middleware/authCheck.js'

const router = express.Router()
const onlineUsers = new Map()
const conversation = new Map()
router.use(authCheck)

export default function (wsInstance, filter) {
  // const allClients = wsInstance.getWss().clients

  // when any client connects
  wsInstance.getWss().on('connection', (socket, req) => {
    const user = req.session?.passport?.user
    const payload = { sender: 'server' }
    payload.message = user !== undefined
      ? `Connected as a ${user.display_name}`
      : 'Unauthorized'

    socket.send(JSON.stringify(payload))
  })

  /**
   * @api {ws} /chat/live                   Live chat
   * @apiName LiveChat
   * @apiGroup Chat
   *
   * @apiError () {}                        Unauthorized || internal server error
   */
  router.ws('/live', (ws, req) => {
    onlineUsers.set(req.user.id, ws)
    // console.log('online', onlineUsers.keys())

    ws.on('close', () => {
      const senderID = req.user.id
      if (conversation.has(senderID)) {
        const receiverID = conversation.get(senderID)
        const rws = onlineUsers.get(receiverID)

        // ends conversation for both
        conversation.delete(senderID)
        conversation.delete(receiverID)

        const payload = { sender: 'server', message: `${req.user.display_name} has disconnected` }
        if (rws.readyState === 1) rws.send(JSON.stringify(payload))
      }

      onlineUsers.delete(req.user.id)
    })

    ws.on('message', msg => {
      const senderID = req.user.id
      const payload = JSON.parse(msg)
      payload.senderID = senderID
      payload.sender = req.user.display_name

      if (onlineUsers.has(payload.receiverID)) {
        conversation.set(senderID, payload.receiverID)
        // console.log('conversation', conversation)

        const rws = onlineUsers.get(payload.receiverID)
        payload.message = filter.clean(payload.message)
        rws.send(JSON.stringify(payload))
      } else {
        console.log(payload)
      }

      // @TODO save msg to database
    })
  })

  // @TODO shows who is online
  router.ws('/online', (ws, req) => {

  })

  return router
}
