import db from '../db/queries/Item.queries.js'
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
  changeItemStatus
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
  const result = await db.getItemsByUserID(userID)
  return result[0]
}

/**
 * Gets all items belonging to userID with itemStatus from db
 * @param {object} fields { userID: [string] itemStatus: [boolean] }
 * @return {[object]} [item...]
 */
async function getItemsByUserIDWithStatus (fields) {
  const { userID, itemStatus } = fields
  util.checkID(userID)

  if (typeof itemStatus !== 'boolean') util.invalidArgument(fields)
  const result = await db.getItemsByUserIDWithStatus(fields)
  return result[0]
}

/**
 * Adds item to db
 * @param {object} fields { userID: [number], itemName: [string], itemCondition: [string], itemAge: [number] }
 * @return {object|boolean}
 * > ```
 * ResultSetHeader {
 *   fieldCount: 0,
 *   affectedRows: 1,
 *   insertId: 1,
 *   info: '',
 *   serverStatus: 2,
 *   warningStatus: 0
 * }
 * ```
 */
async function createItem (fields) {
  const { userID, itemName, itemCondition, itemAge } = fields
  util.checkID(userID)
  util.checkEmptyString(itemName)
  util.checkEmptyString(itemCondition)

  if (itemAge < 0 || itemAge > 32767) util.invalidArgument(fields)
  return await db.createItem(fields)
}

/**
 * Deletes item from db
 * @param {number} userID
 * @return {}
 */
async function deleteItem (itemID) {
  util.checkID(itemID)

  if (util.DB_ENTRY_CHECK) await checkItem(itemID)
  return await db.deleteItem(itemID)
}

/**
 * Updates item name in db
 * @param {object} fields { itemID: [number], itemName: [string] }
 * @return {}
 */
async function updateItemName (fields) {
  const { itemID, itemName } = fields
  util.checkID(itemID)
  util.checkEmptyString(itemName)

  if (util.DB_ENTRY_CHECK) await checkItem(itemID)
  return await db.updateItemName(fields)
}

/**
 * Updates item condition in db
 * @param {object} fields { itemID: [number], itemCondition: [string] }
 * @return {}
 */
async function updateItemCondition (fields) {
  const { itemID, itemCondition } = fields
  util.checkID(itemID)
  util.checkEmptyString(itemCondition)

  if (util.DB_ENTRY_CHECK) await checkItem(itemID)
  return await db.updateItemCondition(fields)
}

/**
 * Updates item age in db
 * @param {object} fields { itemID: [number], itemAge: [number < 32767] }
 * @return {}
 */
async function updateItemAge (fields) {
  const { itemID, itemAge } = fields
  util.checkID(itemID)

  if (itemAge < 0 || itemAge > 32767) util.invalidArgument(fields)
  if (util.DB_ENTRY_CHECK) await checkItem(itemID)
  return await db.updateItemAge(fields)
}

/**
 * Changes item status in db
 * @param {object} fields { itemID: [number], itemStatus: [boolean] }
 * @return {}
 */
async function changeItemStatus (fields) {
  const { itemID, itemStatus } = fields
  util.checkID(itemID)

  if (typeof itemStatus !== 'boolean') util.invalidArgument(fields)
  if (util.DB_ENTRY_CHECK) await checkItem(itemID)
  return await db.changeItemStatus(fields)
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
