import db from '../mysql.connect.js'
const execute = db.dbExecute
const query = db.dbQuery

export default {
  saveMessage,
  getAllMessage,
  getAllConversations,
  viewedMessage,
  liveViewMessage,
  deleteMessage,
  deleteConversation
}

/**
 * @param {object} fields
 * @param {number} fields.senderID
 * @param {number} fields.receiverID
 * @param {string} fields.message
 */
async function saveMessage (fields) {
  return await execute('CALL InsertMessage (?, ?, ?)',
    [fields.senderID, fields.receiverID, fields.message])
}

/**
 * @param {object} fields
 * @param {number} fields.userID
 * @param {number} fields.receiverID
 */
async function getAllMessage (fields) {
  return await query(
    `SELECT Message.id, Message.message, UserMessage.receiver_id, UserMessage.sender_id,
     User.display_name AS sender_displayName FROM Message
     JOIN UserMessage ON Message.id = UserMessage.message_id
     JOIN User ON User.id = UserMessage.sender_id
     WHERE ? IN (UserMessage.receiver_id, UserMessage.sender_id)
     AND ? IN (UserMessage.sender_id, UserMessage.receiver_id)
     ORDER BY Message.created_on DESC`,
    [fields.userID, fields.receiverID])
}

/**
 * @param {number} userID
 */
async function getAllConversations (userID) {
  return await query(
    `SELECT * FROM (
      SELECT UserMessage.sender_id, User.display_name, User.avatar_url, max(Message.created_on) AS created_on
      FROM UserMessage
      JOIN User ON User.id = UserMessage.sender_id
      JOIN Message ON Message.id = UserMessage.message_id
      WHERE ? IN (UserMessage.sender_id, UserMessage.receiver_id)
      AND ? != UserMessage.sender_id
      GROUP BY sender_id) AS tbl
    ORDER BY created_on DESC`,
    [userID, userID]
  )
}

/**
 * @param {object} fields
 * @param {number} fields.userID
 * @param {number} fields.senderID
 */
async function viewedMessage (fields) {
  return await execute(
    'UPDATE UserMessage SET receiver_read = true WHERE receiver_id = ? AND sender_id = ?',
    [fields.userID, fields.senderID])
}

/**
 * @param {object} fields
 * @param {number} fields.userID
 * @param {number} fields.receiverID
 */
async function liveViewMessage (fields) {
  return await execute(
    `UPDATE UserMessage SET receiver_read = true
     WHERE receiver_read = false
     AND ? IN (receiver_id, sender_id)
     AND ? IN (sender_id, receiver_id)`,
    [fields.userID, fields.receiverID]
  )
}

/**
 * @param {object} fields
 * @param {number} fields.messageID
 * @param {number} fields.userID
 */
async function deleteMessage (fields) {
  return await execute(
    `DELETE Message FROM Message
     JOIN UserMessage ON Message.id = UserMessage.message_id
     WHERE Message.id = ? AND
     UserMessage.sender_id = ?`,
    [fields.messageID, fields.userID]
  )
}

/**
 * @param {object} fields
 * @param {number} fields.userID
 * @param {number} fields.receiverID
 */
async function deleteConversation (fields) {
  return await execute(
    `DELETE Message FROM Message
     JOIN UserMessage ON Message.id = UserMessage.message_id
     WHERE ? IN (UserMessage.sender_id, UserMessage.receiver_id)
     AND ? IN (UserMessage.sender_id, UserMessage.receiver_id)`,
    [fields.userID, fields.receiverID]
  )
}
