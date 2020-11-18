import Message from '../model/MessageModel.js'
import handler from '../util/handler.js'

export default {
  saveMessage,
  getAllMessage,
  getAllConversations,
  liveViewMessage,
  deleteMessage,
  deleteConversation
}

/**
 * @param {number} senderID
 * @param {number} receiverID
 * @param {string} message
 * @returns {boolean}
 */
async function saveMessage (senderID, receiverID, message) {
  const result = await handler.asyncErrorHandler(
    Message.saveMessage, { senderID: +senderID, receiverID: +receiverID, message }
  )
  return result.affectedRows === 1
}

/**
 * @param {number} userID
 * @param {number} senderID
 * @return {[object]|false}
 * ```
 *  [
 *     {
 *        "id": 2,
 *        "message": "whats up from Joe",
 *        "receiver_id": 1,
 *        "sender_id": 2,
 *        "sender_displayName": "Joe"
 *     },
 *     {
 *        "id": 1,
 *        "message": "hello from John",
 *        "receiver_id": 2,
 *        "sender_id": 1,
 *        "sender_displayName": "John"
 *     }
 *  ]
 * ```
 */
async function getAllMessage (userID, receiverID) {
  await handler.asyncErrorHandler(Message.viewedMessage,
    { userID: +userID, senderID: +receiverID },
    'MessageController: getAllMessage - Message.viewMessage'
  )

  return await handler.asyncErrorHandler(
    Message.getAllMessage,
    { userID: +userID, receiverID: +receiverID },
    'MessageController: getAllMessage - Message.getAllMessage'
  )
}

/**
 * @param {number} userID
 * @return {[object]|false}
 * ```
 *  [
 *    {
 *      sender_id: 3,
 *      display_name: "Test User 3",
 *      avatar_url: null,
 *      created_on: "2020-11-16T06:45:59.000Z"
 *    },
 *    {
 *      sender_id: 2,
 *      display_name: "Test User 2",
 *      avatar_url: null,
 *      created_on: "2020-11-16T06:45:15.000Z"
 *    }
 *  ]
 * ```
 */
async function getAllConversations (userID) {
  return await handler.asyncErrorHandler(Message.getAllConversations, userID,
    'MessageController: getAllConversations - Message.getAllConversations'
  )
}

/**
 * @param {number} userID
 * @param {number} receiverID
 * @return {object|false}
 * ```
 *  ResultSetHeader {
 *    fieldCount: 0,
 *    affectedRows: 13,
 *    insertId: 0,
 *    info: 'Rows matched: 13  Changed: 1  Warnings: 0',
 *    serverStatus: 34,
 *    warningStatus: 0,
 *    changedRows: 1
 *  }
 * ```
 */
async function liveViewMessage (userID, receiverID) {
  return await handler.asyncErrorHandler(Message.liveViewMessage,
    { userID: +userID, receiverID: +receiverID },
    'MessageController: liveViewMessage - Message.liveViewMessage'
  )
}

/**
 * @param {number} userID
 * @param {number} messageID
 * @return {boolean}
 */
async function deleteMessage (userID, messageID) {
  const result = await handler.asyncErrorHandler(Message.deleteMessage,
    { userID: +userID, messageID: +messageID },
    'MessageController: deleteMessage - Message.deleteMessage'
  )
  return result.affectedRows === 1
}

/**
 * @param {number} userID
 * @param {number} receiverID
 * @param {boolean}
 */
async function deleteConversation (userID, receiverID) {
  const result = await handler.asyncErrorHandler(Message.deleteConversation,
    { userID: +userID, receiverID: +receiverID }
  )
  return result.affectedRows >= 0
}
