import db from '../mysql.connect.js'
const query = db.dbQuery

export default {
  getImageByImageID,
  getAllImagesByUserID,

  addImage,
  updateImage,
  deleteImage
}

/**
 * @param {number} imageID
 * @return {[object]} single image [ BinaryRow { data } ]
 */
async function getImageByImageID (imageID) {
  return await query('SELECT * FROM Image WHERE ID = ?', [imageID])
}

/**
 * @param {number} userID
 * @return {[object]} multiple images [ BinaryRow { data } ]
 */
async function getAllImagesByUserID (userID) {
  return await query('SELECT * FROM Image WHERE user_id = ?', [userID])
}

/**
 * @param {object} fields { userID: [number] imageURL: [string]]
 * @return {}
 */
async function addImage (fields) {
  const { userID, imageURL } = fields
  return await query('INSERT INTO Image SET url = ?, user_id = ?',
    [imageURL, userID]
  )
}

/**
 * @param {object} fields { imageID: [number] imageURL: [string]]
 * @return {}
 */
async function updateImage (fields) {
  const { imageID, imageURL } = fields
  return await query('UPDATE Image SET url = ? WHERE id = ?',
    [imageURL, imageID]
  )
}

/**
 * @param {number} imageID
 * @return {}
 */
async function deleteImage (imageID) {
  return await query('DELETE FROM Image WHERE id = ?', [imageID])
}
