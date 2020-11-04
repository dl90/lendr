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
 * @param {object} fields { userID: [string] itemStatus: [0|1] }
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
 * @param {object} fields { userID: [number], itemName: [string], itemCondition: [string], itemAge: [smallint] }
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
 * @param {number} itemID
 * @return {}
 */
async function deleteItem (itemID) {
  return await execute('DELETE FROM Item WHERE id = ?', [itemID])
}

/**
 * @param {object} fields { itemID: [number], itemName: [string] }
 * @return {}
 */
async function updateItemName (fields) {
  const { itemID, itemName } = fields
  return await execute('UPDATE Item SET item_name = ? WHERE id = ?',
    [itemName, itemID])
}

/**
 * @param {object} fields { itemID: [number], itemCondition: [string] }
 * @return {}
 */
async function updateItemCondition (fields) {
  const { itemID, itemCondition } = fields
  return await execute('UPDATE Item SET item_condition = ? WHERE id = ?',
    [itemCondition, itemID]
  )
}

/**
 * @param {object} fields { itemID: [number], itemAge: [smallint < 32767] }
 * @return {}
 */
async function updateItemAge (fields) {
  const { itemID, itemAge } = fields
  return await execute('UPDATE Item SET item_age = ? WHERE id = ?',
    [itemAge, itemID]
  )
}

/**
 * @param {object} fields { itemID: [number], itemStatus: [boolean] }
 * @return {}
 */
async function updateItemStatus (fields) {
  const { itemID, itemStatus } = fields
  return await execute('UPDATE Item SET item_status = ? WHERE id = ?',
    [itemStatus, itemID]
  )
}

/**
 * @param {object} fields { userID: [number], itemName: [string], itemCondition: [string], itemAge: [smallint], itemStatusL [0|1] }
 * @return {}
 */
async function updateAllItemFields (fields) {
  const { itemID, itemName, itemCondition, itemAge, itemStatus } = fields
  return await execute('UPDATE Item SET item_name = ?, item_condition = ?, item_age = ?, item_status = ? WHERE id = ?',
    [itemName, itemCondition, itemAge, itemStatus, itemID]
  )
}
