import Item from '../model/ItemModel.js'
import handler from '../util/handler.js'

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
 * @param {number} itemID
 * @return {object|false}
 * ```
 *  TextRow {
 *    id: 2,
 *    created_on: 2020-11-02T04:07:55.000Z,
 *    item_name: 'test',
 *    item_condition: 'great',
 *    age: 12,
 *    item_status: 1,
 *    lender_id: 1
 *  } || false
 * ```
 */
async function getItemByItemID (itemID) {
  return await handler.asyncErrorHandler(Item.getItemByItemID, +itemID)
}

/**
 * @param {number} userID
 * @return {[object]|false}
 * ```
 *  [
 *    TextRow {
 *      id: 10,
 *      created_on: 2020-11-02T04:23:48.000Z,
 *      item_name: 'test',
 *      item_condition: 'great',
 *      age: 12,
 *      item_status: 1,
 *      lender_id: 1
 *    },
 *    TextRow {
 *      id: 9,
 *      created_on: 2020-11-02T04:23:47.000Z,
 *      item_name: 'test',
 *      item_condition: 'great',
 *      age: 12,
 *      item_status: 1,
 *      lender_id: 1
 *    }
 *  ]
 * ```
 */
async function getItemsByUserID (userID) {
  return await handler.asyncErrorHandler(Item.getItemsByUserID, +userID)
}

/**
 * @param {number} userID
 * @param {0|1} itemStatus
 * @return {[object]|false}
 */
async function getItemsByUserIDWithStatus (userID, itemStatus) {
  return await handler.asyncErrorHandler(
    Item.getItemsByUserIDWithStatus,
    { userID: +userID, itemStatus: +itemStatus }
  )
}

/**
 * @param {number} userID
 * @param {string} itemName
 * @param {string} itemCondition
 * @param {number} itemAge
 * @return {number|false} itemID || false if invalid params
 */
async function createItem (userID, itemName, itemCondition, itemAge) {
  const result = await handler.asyncErrorHandler(Item.createItem, {
    userID: +userID,
    itemName,
    itemCondition,
    itemAge: +itemAge
  })
  return result.insertId ?? false
}

/**
 * @param {number} itemID
 * @return {boolean} true if deleted
 */
async function deleteItem (itemID) {
  const result = await handler.asyncErrorHandler(Item.deleteItem, +itemID)
  return result.affectedRows === 1
}

/**
 * @param {number} itemID
 * @param {string} itemName
 * @return {boolean} true if updated
 */
async function updateItemName (itemID, itemName) {
  const result = await handler.asyncErrorHandler(Item.updateItemName,
    { itemID: +itemID, itemName }
  )
  return result.affectedRows === 1
}

/**
 * @param {number} itemID
 * @param {string} itemCondition
 * @return {boolean} true if updated
 */
async function updateItemCondition (itemID, itemCondition) {
  const result = await handler.asyncErrorHandler(Item.updateItemCondition,
    { itemID: +itemID, itemCondition }
  )
  return result.affectedRows === 1
}

/**
 * @param {number} itemID
 * @param {number} itemAge
 * @return {boolean} true if updated
 */
async function updateItemAge (itemID, itemAge) {
  const result = await handler.asyncErrorHandler(Item.updateItemAge,
    { itemID: +itemID, itemAge: +itemAge }
  )
  return result.affectedRows === 1
}

/**
 * @param {number} itemID
 * @param {number} itemStatus
 * @return {boolean} true if updated
 */
async function updateItemStatus (itemID, itemStatus) {
  const result = await handler.asyncErrorHandler(Item.updateItemStatus,
    { itemID: +itemID, itemStatus: +itemStatus }
  )
  return result.affectedRows === 1
}

/**
 * @param {number} itemID
 * @param {string} itemName
 * @param {string} itemCondition
 * @param {number} itemAge
 * @param {number} itemStatus
 * @return {boolean} true if updated
 */
async function updateAllItemFields (itemID, itemName, itemCondition, itemAge, itemStatus) {
  const result = await handler.asyncErrorHandler(Item.updateAllItemFields,
    { itemID: +itemID, itemName, itemCondition, itemAge: +itemAge, itemStatus: +itemStatus }
  )
  return result.affectedRows === 1
}