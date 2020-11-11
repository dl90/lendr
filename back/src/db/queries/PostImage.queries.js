import db from '../mysql.connect.js'
const execute = db.dbExecute
const query = db.dbQuery

export default {
  addPostImage,
  addPostImages,
  deletePostImage,
  getPostImageByID,
  getAllImageIDsByPostID,
  getAllPostIDsByImageID
}

/**
 * @param {number} postID
 * @param {number} imageID
 * @return {}
 */
async function addPostImage (postID, imageID) {
  return await execute('INSERT INTO PostImage SET post_id = ?, image_id = ?',
    [postID, imageID])
}

/**
 * @param {array} fields
 * ```
 *  [ [post_id, image_id], [post_id, image_id], ...]
 * ```
 * @return {}
 */
async function addPostImages (fields) {
  return await query('INSERT INTO PostImage (post_id, image_id)', [fields])
}

/**
 * @param {number} postImageID
 * @return {}
 */
async function deletePostImage (postImageID) {
  return await execute('DELETE FROM PostImage WHERE id = ?', [postImageID])
}

/**
 * @param {number} postImageID
 * @return {}
 */
async function getPostImageByID (postImageID) {
  return await query('SELECT * FROM PostImage WHERE id = ?', [postImageID])
}

/**
 * @param {number} postID
 * @return {}
 */
async function getAllImageIDsByPostID (postID) {
  return await query('SELECT image_id FROM PostImage WHERE post_id = ?', [postID])
}

/**
 * @param {number} imageID
 * @return {}
 */
async function getAllPostIDsByImageID (imageID) {
  return await query('SELECT post_id FROM PostImage WHERE image_id = ?', [imageID])
}
