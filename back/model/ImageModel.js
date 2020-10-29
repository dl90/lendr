import db from '../db/queries/Image.queries.js'
import util from './util.js'

export default {
  getImageByImageID,
  getAllImagesByUserID,

  addImage,
  updateImage,
  deleteImage
}

/**
 * Gets all image fields from db
 * @param {number} imageID
 * @return {object} image
 */
async function getImageByImageID (imageID) {
  util.checkID(imageID)
  const result = await db.getItemByID(imageID)
  return result[0]
}

/**
 * Gets all items belonging to userID from db
 * @param {number} itemID
 * @return {[object]} [item...]
 */
async function getAllImagesByUserID (userID) {
  util.checkID(userID)
  const result = await db.getAllImagesByUserID(userID)
  return result[0]
}

/**
 * Adds image to db
 * @param {object} fields { userID: [number], imageURL: [string] }
 * @return {object}
 * > ```
 * ResultSetHeader {
 *   fieldCount: 0,
 *   affectedRows: 1,
 *   insertId: 1,
 *   info: '',
 *   serverStatus: 2,
 *   warningStatus: 0
 * }
 * ```
 */
async function addImage (fields) {
  const { userID, imageURL } = fields
  util.checkID(userID)
  util.validateURL(imageURL)

  return await db.addImage(fields)
}

/**
 * Updates image URL in db
 * @param {object} fields { userID: [number], imageURL: [string] }
 * @return {}
 */
async function updateImage (fields) {
  const { imageID, imageURL } = fields
  util.checkID(imageID)
  util.validateURL(imageURL)

  return await db.updateImage(fields)
}

/**
 * Deletes image URL from db
 * @param {number} imageID
 * @return {}
 */
async function deleteImage (imageID) {
  util.checkID(imageID)
  return await db.deleteImage(imageID)
}
