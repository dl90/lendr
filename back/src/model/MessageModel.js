import db from '../db/queries/Message.queries.js'
import util from '../util/util.js'

export default {
  saveMessage,
  getAllMessage,
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
 * @return {object}
 * ```
 *  ResultSetHeader {
 *    fieldCount: 0,
 *    affectedRows: 1,
 *    insertId: 0,
 *    info: '',
 *    serverStatus: 2,
 *    warningStatus: 0
 *  }
 * ```
 */
async function saveMessage (fields) {
  util.checkID(fields.senderID)
  util.checkID(fields.receiverID)
  util.checkEmptyString(fields.message)
  return await db.saveMessage(fields)
}

/**
 * @param {object} fields
 * @param {number} fields.userID
 * @param {number} fields.receiverID
 */
async function getAllMessage (fields) {
  util.checkID(fields.userID)
  util.checkID(fields.receiverID)
  const result = await db.getAllMessage(fields)
  return result
}

/**
 * @param {object} fields
 * @param {number} fields.userID
 * @param {number} fields.senderID
 */
async function viewedMessage (fields) {
  util.checkID(fields.userID)
  util.checkID(fields.senderID)
  return await db.viewedMessage(fields)
}

/**
 * @param {object} fields
 * @param {number} fields.userID
 * @param {number} fields.receiverID
 */
async function liveViewMessage (fields) {
  util.checkID(fields.userID)
  util.checkID(fields.receiverID)
  return await db.liveViewMessage(fields)
}

/**
 * @param {object} fields
 * @param {number} fields.messageID
 * @param {number} fields.userID
 */
async function deleteMessage (fields) {
  util.checkID(fields.messageID)
  util.checkID(fields.userID)
  return await db.deleteMessage(fields)
}

/**
 * @param {object} fields
 * @param {number} fields.userID
 * @param {number} fields.receiverID
 */
async function deleteConversation (fields) {
  util.checkID(fields.userID)
  util.checkID(fields.receiverID)
  return await db.deleteConversation(fields)
}
