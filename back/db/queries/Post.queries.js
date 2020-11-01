import db from '../mysql.connect.js'
const execute = db.dbExecute
const query = db.dbQuery

export default {
  createPost,
  deletePost,
  getPostByPostID,
  getAllPostsByUserID,
  getAllPostsByItemID
}

/**
 * @param {object} fields
 * ```
 *  {
 *    postTitle: [string],
 *    postRate: [decimal(11, 2)],
 *    postDescription: [string],
 *    postLocation: [string],
 *    postDuration: [timestamp],
 *    userID: [number],
 *    itemID: [number]
 *  }
 * ```
 * @return {object}
 */
async function createPost (fields) {
  const { postTitle, postRate, postDescription, postLocation, postDuration, userID, itemID } = fields
  return await execute(
    'INSERT INTO Post title = ?, rate = ?, post_description = ?, location = ?, duration = ? user_id = ? item_id = ?',
    [postTitle, postRate, postDescription, postLocation, postDuration, userID, itemID]
  )
}

/**
 * @param {number} postID
 * @return {}
 */
async function deletePost (postID) {
  return await execute('DELETE FROM Post WHERE id = ?', [postID])
}

/**
 * @param {number} postID
 * @return {[object]} single post [ BinaryRow { data } ]
 */
async function getPostByPostID (postID) {
  return await query('SELECT * FROM Post WHERE id = ?', [postID])
}

/**
 * @param {number} userID
 * @return {[object]} multiple posts [ BinaryRow { data } ]
 */
async function getAllPostsByUserID (userID) {
  return await query('SELECT * FROM Post WHERE user_id = ?', [userID])
}

/**
 * @param {number} itemID
 * @return {[object]} multiple posts [ BinaryRow { data } ]
 */
async function getAllPostsByItemID (itemID) {
  return await query('SELECT * FROM Post WHERE item_id = ?', [itemID])
}
