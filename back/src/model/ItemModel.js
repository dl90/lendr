import db from '../db/queries/Item.queries.js'
import config from '../util/config.js'
import util from '../util/util.js'

export default {
  getItemByItemID,
  getItemsByUserID,
  getItemsByUserIDWithStatus,

  createItem,
  deleteItem,

  updateItemName,
  updateItemCondition,
  updateItemAge,
  updateItemStatus,
  updateAllItemFields
}

/**
 * Gets all item fields from db
 * @param {number} itemID
 * @return {object} item
 */
async function getItemByItemID (itemID) {
  util.checkID(itemID)
  const result = await db.getItemByID(itemID)
  return result[0]
}

/**
 * Gets all items belonging to userID from db
 * @param {number} itemID
 * @return {[object]} [item...]
 */
async function getItemsByUserID (userID) {
  util.checkID(userID)
  return await db.getItemsByUserID(userID)
}

/**
 * Gets all items belonging to userID with itemStatus from db
 * @param {object} fields { userID: [string] itemStatus: [0|1] }
 * @return {[object]} [item...]
 */
async function getItemsByUserIDWithStatus (fields) {
  const { userID, itemStatus } = fields
  util.checkID(userID)
  util.checkStatus(itemStatus)

  return await db.getItemsByUserIDWithStatus(fields)
}

/**
 * Adds item to db
 * @param {object} fields { userID: [number], itemName: [string], itemCondition: [string], itemAge: [number] }
 * @return {object}
 * ```
 *  ResultSetHeader {
 *    fieldCount: 0,
 *    affectedRows: 1,
 *    insertId: 1,
 *    info: '',
 *    serverStatus: 2,
 *    warningStatus: 0
 *  }
 * ```
 */
async function createItem (fields) {
  const { userID, itemName, itemCondition, itemAge } = fields
  util.checkID(userID)
  util.checkEmptyString(itemName)
  util.checkEmptyString(itemCondition)
  util.checkSmallInt(itemAge)

  return await db.createItem(fields)
}

/**
 * @param {object} fields
 * ```
 *  { userID: [number], itemID: [number] }
 * ```
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
async function deleteItem (fields) {
  util.checkID(fields.userID)
  util.checkID(fields.itemID)

  if (config.DB_ENTRY_CHECK) await checkItem(fields.itemID)
  return await db.deleteItem(fields)
}

/**
 * @param {object} fields
 * ```
 *  { userID: [number], itemID: [number], itemName: [string] }
 * ```
 * @return {object}
 * ```
 *  ResultSetHeader {
 *    fieldCount: 0,
 *    affectedRows: 1,
 *    insertId: 0,
 *    info: 'Rows matched: 1  Changed: 1  Warnings: 0',
 *    serverStatus: 2,
 *    warningStatus: 0,
 *    changedRows: 1
 *  }
 * ```
 */
async function updateItemName (fields) {
  util.checkID(fields.userID)
  util.checkID(fields.itemID)
  util.checkEmptyString(fields.itemName)

  if (config.DB_ENTRY_CHECK) await checkItem(fields.itemID)
  return await db.updateItemName(fields)
}

/**
 * @param {object} fields
 * ```
 *  { userID: [number], itemID: [number], itemCondition: [string] }
 * ```
 * @return {}
 */
async function updateItemCondition (fields) {
  util.checkID(fields.userID)
  util.checkID(fields.itemID)
  util.checkEmptyString(fields.itemCondition)

  if (config.DB_ENTRY_CHECK) await checkItem(fields.itemID)
  return await db.updateItemCondition(fields)
}

/**
 * @param {object} fields
 * ```
 *  { userID: [number], itemID: [number], itemAge: [number < 32767] }
 * ```
 * @return {}
 */
async function updateItemAge (fields) {
  util.checkID(fields.userID)
  util.checkID(fields.itemID)
  util.checkSmallInt(fields.itemAge)

  if (config.DB_ENTRY_CHECK) await checkItem(fields.itemID)
  return await db.updateItemAge(fields)
}

/**
 * @param {object} fields
 * ```
 *  { userID: [number], itemID: [number], itemStatus: [boolean] }
 * ```
 * @return {}
 */
async function updateItemStatus (fields) {
  util.checkID(fields.userID)
  util.checkID(fields.itemID)
  util.checkBool(fields.itemStatus)

  if (config.DB_ENTRY_CHECK) await checkItem(fields.itemID)
  return await db.updateItemStatus(fields)
}

/**
 * @param {object} fields
 * ```
 *  {
 *    userID: [number],
 *    itemID: [number],
 *    itemName: [string],
 *    itemCondition: [string],
 *    itemAge: [smallint],
 *    itemStatus: [boolean]
 *  }
 * ```
 * @return {}
 */
async function updateAllItemFields (fields) {
  util.checkID(fields.userID)
  util.checkID(fields.itemID)
  util.checkEmptyString(fields.itemName)
  util.checkEmptyString(fields.itemCondition)
  util.checkSmallInt(fields.itemAge)
  util.checkBool(fields.itemStatus)

  if (config.DB_ENTRY_CHECK) await checkItem(fields.itemID)
  return await db.updateAllItemFields(fields)
}

/* -------------------- util -------------------- */

/**
 * throws error if item does not exist in db
 * @param {number} userID
 * @throw entry missing error
 */
async function checkItem (itemID) {
  const result = await db.getItemByID(itemID)
  if (result.length === 0) util.missingEntry(itemID)
}
