import db from '../mysql.connect.js'
const execute = db.dbExecute
const query = db.dbQuery

export default {
  addPostTag,
  deletePostTag,

  getPostTagByID,
  getPostTagByPostIDTagID
}

/**
 * @param {object} fields
 * @param {number} fields.postID
 * @param {number} fields.tagID
 */
async function addPostTag (fields) {
  return await execute('INSERT INTO PostTag SET post_id = ?, tag_id = ?',
    [fields.postID, fields.tagID])
}

/**
 * @param {number} postTagID
 */
async function deletePostTag (postTagID) {
  return await execute('DELETE FROM PostTag WHERE id = ?', [postTagID])
}

/**
 * @param {number} postTagID
 */
async function getPostTagByID (postTagID) {
  return await query('SELECT * FROM PostTag WHERE id = ? LIMIT 1', [postTagID])
}

/**
 * @param {object} fields
 * @param {number} postID
 * @param {number} tagID
 */
async function getPostTagByPostIDTagID (fields) {
  return await query('SELECT * FROM PostTag WHERE post_id = ? AND tag_id = ? LIMIT 1', [fields.postID, fields.tagID])
}
