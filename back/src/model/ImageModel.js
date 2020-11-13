import db from '../db/queries/Image.queries.js'
import config from '../util/config.js'
import util from '../util/util.js'

export default {
  getImageByImageID,
  getAllImagesByUserID,

  addImage,
  addImages,
  updateImage,
  deleteImage
}

/**
 * @param {number} imageID
 * @return {object} image
 */
async function getImageByImageID (imageID) {
  util.checkID(imageID)
  const result = await db.getItemByID(imageID)
  return result[0]
}

/**
 * @param {number} itemID
 * @return {[object]} [item...]
 */
async function getAllImagesByUserID (userID) {
  util.checkID(userID)
  const result = await db.getAllImagesByUserID(userID)
  return result[0]
}

/**
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
  util.checkID(fields.userID)
  util.validateURL(fields.imageURL)
  return await db.addImage(fields)
}

/**
 * @param {object} fields
 * ```
 *  { userID: [number], imageArray: [{ location: 'www.' }, ...] }
 * ```
 * @return {object}
 * > ```
 * ResultSetHeader {
 *   fieldCount: 0,
 *   affectedRows: 4,
 *   insertId: 16,
 *   info: 'Records: 4  Duplicates: 0  Warnings: 0',
 *   serverStatus: 2,
 *   warningStatus: 0
 * }
 * ```
 */
async function addImages (fields) {
  const { userID, imageArray } = fields
  util.checkID(userID)

  if (imageArray.length < 0) util.invalidArgument(imageArray)
  const arr = imageArray.map(obj => [obj.location, userID])
  return await db.addImages(arr)
}

/**
 * @param {object} fields { userID: [number], imageURL: [string] }
 * @return {}
 */
async function updateImage (fields) {
  util.checkID(fields.imageID)
  util.validateURL(fields.imageURL)
  checkImageID(fields.imageID)

  return await db.updateImage(fields)
}

/**
 * @param {string} imageID
 * @return {}
 */
async function deleteImage (imageURL) {
  util.validateURL(imageURL)
  return await db.deleteImageByURL(imageURL)
}

/* -------------------- util -------------------- */

/**
 * throws error if image does not exist in db
 * @param {number} imageID
 * @throw entry missing error
 */
async function checkImageID (imageID) {
  if (config.DB_ENTRY_CHECK) {
    const result = await getImageByImageID(imageID)
    if (result.length === 0) util.missingEntry(imageID)
  }
}
