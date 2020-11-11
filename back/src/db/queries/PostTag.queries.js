import db from '../mysql.connect.js'
const execute = db.dbExecute
const query = db.dbQuery

export default {
  addPostTag,
  deletePostTag,
  getPostTagByID

  // getAllPostIDsByTagID
  // getAllTagIDsByPostID
}

/**
 * @param {number} postID
 * @param {number} tagID
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
async function addPostTag (postID, tagID) {
  return await execute('INSERT INTO PostTag SET post_id = ?, tag_id = ?',
    [postID, tagID])
}

/**
 * @param {number} postTagID
 * @return {}
 */
async function deletePostTag (postTagID) {
  return await execute('DELETE FROM PostTag WHERE id = ?', [postTagID])
}

/**
 * @param {number} postTagID
 */
async function getPostTagByID (postTagID) {
  return await query('SELECT * FROM PostTag WHERE id = ?', [postTagID])
}
