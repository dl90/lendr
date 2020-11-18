import db from '../mysql.connect.js'
const execute = db.dbExecute
const query = db.dbQuery

export default {
  addPostImages,
  deletePostImage,
  getPostImageByID,
  getAllImageIDsByPostID,
  getAllPostIDsByImageID
}

/**
 * @param {array} fields
 * ```
 *  [ [post_id, image_id], [post_id, image_id], ...]
 * ```
 * @return {}
 */
async function addPostImages (fields) {
  return await query('INSERT INTO PostImage (post_id, image_id) VALUE ?', [fields])
}

/**
 * @param {number} postImageID
 * @return {}
 * @TODO delete entry from image and s3
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
  return await query(
    `SELECT Image.url, PostImage.id FROM Image
     JOIN PostImage ON Image.id = PostImage.image_id
     WHERE PostImage.post_id = ?
     ORDER BY Image.id`,
    [postID])
}

/**
 * @param {number} imageID
 * @return {}
 */
async function getAllPostIDsByImageID (imageID) {
  return await query('SELECT post_id FROM PostImage WHERE image_id = ?', [imageID])
}
