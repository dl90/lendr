import express from 'express'
import authCheck from '../middleware/authCheck.js'
import MessageController from '../controller/MessageController.js'

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
   * @api {ws} /msg/live                    Live msg socket route
   * @apiName LiveMsg
   * @apiGroup Msg
   *
   * @apiError () {}                        Unauthorized || internal server error
   */
  router.ws('/live', (ws, req) => {
    onlineUsers.set(req.user.id, ws)

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
      const userID = req.user.id
      const payload = JSON.parse(msg)
      payload.senderID = userID
      payload.sender = req.user.display_name

      /*
        payload {
          senderID: 1,
          sender: "John",
          receiverID: 2,
          receiver: "Joe",
          message: "a"
        }
      */
      MessageController.saveMessage(userID, payload.receiverID, payload.message)

      if (onlineUsers.has(payload.receiverID)) {
        conversation.set(userID, payload.receiverID)
        payload.message = filter.clean(payload.message)
        onlineUsers.get(payload.receiverID).send(JSON.stringify(payload))

        MessageController.liveViewMessage(userID, payload.receiverID)
      }
    })
  })

  /**
   * @api {post} /msg/get                  Get all messages between you and another user
   * @apiName GetMsg
   * @apiGroup Msg
   *
   * @apiParam {number} receiverID
   *
   * @apiSuccess (200) {json}               Messages
   * @apiError (400) {}                     Error
   */
  router.post('/get', async (req, res) => {
    const messages = await MessageController.getAllMessage(req.user.id, req.body.receiverID)
    messages
      ? res.json(messages)
      : res.sendStatus(400)
  })

  /**
   * @api {get} /msg/conversations          Returns a list of users info from users you messaged previously
   * @apiName GetConversations
   * @apiGroup Msg
   *
   * @apiSuccess (200) {json}               Messages
   * @apiError (400) {}                     Error
   */
  router.get('/conversations', async (req, res) => {
    const conversations = await MessageController.getAllConversations(req.user.id)
    conversations
      ? res.json(conversations)
      : res.sendStatus(400)
  })

  /**
   * @api {delete} /msg/delete              Delete a message sent by you to another user
   * @apiName DeleteMsg
   * @apiGroup Msg
   *
   * @apiParam {number} messageID
   *
   * @apiSuccess (204) {}                   Success
   * @apiError (400) {}                     Error
   */
  router.delete('/delete', async (req, res) => {
    await MessageController.deleteMessage(req.user.id, req.body.messageID)
      ? res.sendStatus(204)
      : res.sendStatus(400)
  })

  /**
   * @api {delete} /msg/delete-all          Delete all messages between you another user
   * @apiName DeleteAllMsg
   * @apiGroup Msg
   *
   * @apiParam {number} receiverID
   *
   * @apiSuccess (204) {}                   Success
   * @apiError (400) {}                     Error
   */
  router.delete('/delete-all', async (req, res) => {
    await MessageController.deleteConversation(req.user.id, req.body.receiverID)
      ? res.sendStatus(204)
      : res.sendStatus(400)
  })

  return router
}
