import db from '../mysql.connect.js'
const query = db.dbQuery

export default {
  getItemByID,
  getItemsByUserID,
  getItemsByUserIDWithStatus,

  addItem,
  deleteItem,

  updateItemName,
  updateItemCondition,
  updateItemAge,
  changeItemStatus
}

/**
 * @param {number} itemID
 * @return {[object]} single item [ BinaryRow { data } ]
 */
async function getItemByID (itemID) {
  return await query('SELECT * FROM Item WHERE id = ?', [itemID])
}

/**
 * @param {number} userID
 * @return {[object]} all items [ BinaryRow { data } ]
 */
async function getItemsByUserID (userID) {
  return await query(
    'SELECT * FROM Item WHERE lender_id = ? ORDER BY timestamp DESC', [userID]
  )
}

/**
 * @param {object} fields { userID: [string] itemStatus: [boolean] }
 * @return {[object]} all items [ BinaryRow { data } ]
 */
async function getItemsByUserIDWithStatus (fields) {
  const { userID, itemStatus } = fields
  return await query(
    'SELECT * FROM Item WHERE lender_id = ? AND status = ?',
    [userID, itemStatus]
  )
}

/**
 * @param {object} fields { userID: [number], itemName: [string], itemCondition: [string], itemAge: [smallint] }
 * @return {}
 */
async function addItem (fields) {
  const { userID, itemName, itemCondition, itemAge } = fields
  return await query(
    'INSERT INTO Item SET name = ?, condition = ?, age = ?, lender_id = ?',
    [itemName, itemCondition, itemAge, userID]
  )
}

/**
 * @param {number} itemID
 * @return {}
 */
async function deleteItem (itemID) {
  return await query('DELETE FROM Item WHERE id = ?', [itemID])
}

/**
 * @param {object} fields { itemID: [number], itemName: [string] }
 * @return {}
 */
async function updateItemName (fields) {
  const { itemID, itemName } = fields
  return await query('UPDATE Item SET name = ? WHERE id = ?',
    [itemName, itemID])
}

/**
 * @param {object} fields { itemID: [number], itemCondition: [string] }
 * @return {}
 */
async function updateItemCondition (fields) {
  const { itemID, itemCondition } = fields
  return await query('UPDATE Item SET condition = ? WHERE id = ?',
    [itemCondition, itemID]
  )
}

/**
 * @param {object} fields { itemID: [number], itemAge: [smallint < 32767] }
 * @return {}
 */
async function updateItemAge (fields) {
  const { itemID, itemAge } = fields
  return await query('UPDATE Item SET age = ? WHERE id = ?',
    [itemAge, itemID]
  )
}

/**
 * @param {object} fields { itemID: [number], itemStatus: [boolean] }
 * @return {}
 */
async function changeItemStatus (fields) {
  const { itemID, itemStatus } = fields
  return await query('UPDATE Item SET status = ? WHERE id = ?',
    [itemStatus, itemID]
  )
}
