import db from '../mysql.connect.js'
const execute = db.dbExecute
const query = db.dbQuery

export default {
  getImageByImageID,
  getAllImagesByUserID,

  addImage,
  addImages,
  updateImage,
  deleteImageByURL
}

/**
 * @param {number} imageID
 * @return {[object]} single image [ BinaryRow { data } ]
 */
async function getImageByImageID (imageID) {
  return await execute('SELECT * FROM Image WHERE ID = ?', [imageID])
}

/**
 * @param {number} userID
 * @return {[object]} multiple images [ BinaryRow { data } ]
 */
async function getAllImagesByUserID (userID) {
  return await execute('SELECT * FROM Image WHERE user_id = ?', [userID])
}

/**
 * @param {object} fields { userID: [number], imageURL: [string]]
 * @return {}
 */
async function addImage (fields) {
  const { userID, imageURL } = fields
  return await execute('INSERT INTO Image SET url = ?, user_id = ?',
    [imageURL, userID]
  )
}

/**
 * @param {array} fields [ [url, user_id], [url, user_id], ...]
 * @return {}
 */
async function addImages (fields) {
  return await query('INSERT INTO Image (url, user_id) VALUES ?', [fields])
}

/**
 * @param {object} fields { imageID: [number], imageURL: [string]]
 * @return {}
 */
async function updateImage (fields) {
  const { imageID, imageURL } = fields
  return await execute('UPDATE Image SET url = ? WHERE id = ?',
    [imageURL, imageID]
  )
}

/**
 * @param {string} imageURL
 * @return {}
 */
async function deleteImageByURL (imageURL) {
  return await execute('DELETE FROM Image WHERE url = ?', [imageURL])
}
