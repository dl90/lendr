import db from '../mysql.connect.js'
const execute = db.dbExecute
const query = db.dbQuery

export default {
  addPostTag,
  deletePostTag,
  getPostTagByID
}

/**
 * @param {number} postID
 * @param {number} tagID
 * @return {}
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
