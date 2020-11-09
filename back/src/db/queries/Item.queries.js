import db from '../mysql.connect.js'
const execute = db.dbExecute
const query = db.dbQuery

export default {
  getItemByID,
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
 * @param {number} itemID
 * @return {[object]} single item [ BinaryRow { data } ]
 */
async function getItemByID (itemID) {
  return await query('SELECT * FROM Item WHERE id = ? LIMIT 1', [itemID])
}

/**
 * @param {number} userID
 * @return {[object]} all items [ BinaryRow { data } ]
 */
async function getItemsByUserID (userID) {
  return await query(
    'SELECT * FROM Item WHERE lender_id = ? ORDER BY created_on DESC', [userID]
  )
}

/**
 * @param {object} fields
 * ```
 *  { userID: [string] itemStatus: [boolean] }
 * ```
 * @return {[object]} all items [ BinaryRow { data } ]
 */
async function getItemsByUserIDWithStatus (fields) {
  const { userID, itemStatus } = fields
  return await query(
    `SELECT * FROM Item WHERE lender_id = ? AND item_status = ?
    ORDER BY created_on DESC`,
    [userID, itemStatus]
  )
}

/**
 * @param {object} fields
 * ```
 *  { userID: [number], itemName: [string], itemCondition: [string], itemAge: [smallint] }
 * ```
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
  return await execute(
    'INSERT INTO Item SET item_name = ?, item_condition = ?, item_age = ?, lender_id = ?',
    [itemName, itemCondition, itemAge, userID]
  )
}

/**
 * @param {object} fields
 * ```
 *  { userID: [number], itemID: [number]}
 * ```
 * @return {}
 */
async function deleteItem (fields) {
  return await execute('DELETE FROM Item WHERE id = ? AND lender_id = ?',
    [fields.itemID, fields.userID])
}

/**
 * @param {object} fields
 * ```
 *  { userID: [number] itemID: [number], itemName: [string] }
 * ```
 * @return {}
 */
async function updateItemName (fields) {
  return await execute('UPDATE Item SET item_name = ? WHERE id = ? AND lender_id = ?',
    [fields.itemName, fields.itemID, fields.userID])
}

/**
 * @param {object} fields
 * ```
 *  { userID: [number], itemID: [number], itemCondition: [string] }
 * ```
 * @return {}
 */
async function updateItemCondition (fields) {
  return await execute('UPDATE Item SET item_condition = ? WHERE id = ? AND lender_id = ?',
    [fields.itemCondition, fields.itemID, fields.userID]
  )
}

/**
 * @param {object} fields
 * ```
 *  { itemID: [number], itemAge: [smallint < 32767] }
 * ```
 * @return {}
 */
async function updateItemAge (fields) {
  return await execute('UPDATE Item SET item_age = ? WHERE id = ? AND lender_id = ?',
    [fields.itemAge, fields.itemID, fields.userID]
  )
}

/**
 * @param {object} fields
 * ```
 *  { itemID: [number], itemStatus: [boolean] }
 * ```
 * @return {}
 */
async function updateItemStatus (fields) {
  return await execute('UPDATE Item SET item_status = ? WHERE id = ? AND lender_id = ?',
    [fields.itemStatus, fields.itemID, fields.userID]
  )
}

/**
 * @param {object} fields
 * ```
 *  { userID: [number], itemID: [number] itemName: [string], itemCondition: [string], itemAge: [smallint], itemStatus: [boolean] }
 * ```
 * @return {}
 */
async function updateAllItemFields (fields) {
  const { userID, itemID, itemName, itemCondition, itemAge, itemStatus } = fields
  return await execute('UPDATE Item SET item_name = ?, item_condition = ?, item_age = ?, item_status = ? WHERE id = ? AND lender_id = ?',
    [itemName, itemCondition, itemAge, itemStatus, itemID, userID]
  )
}
