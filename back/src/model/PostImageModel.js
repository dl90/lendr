import db from '../db/queries/PostImage.queries.js'
import util from '../util/util.js'

export default {
  addPostImages,
  deletePostImage,
  getPostImageByID,
  getAllImageIDsByPostID,
  getAllPostIDsByImageID
}

/**
 * @param {object} fields
 * @param {[number]} fields.imageIDs
 * @param {number} fields.postID
 * @return {object}
 * ```
 *  ResultSetHeader {
 *    fieldCount: 0,
 *    affectedRows: 2,
 *    insertId: 7,
 *    info: 'Records: 2  Duplicates: 0  Warnings: 0',
 *    serverStatus: 2,
 *    warningStatus: 0
 *  }
 * ```
 * @throw invalid argument error
 */
async function addPostImages (fields) {
  util.checkID(fields.postID)
  if (fields.imageIDs.length < 0) util.invalidArgument(fields.imageIDs)
  const arr = fields.imageIDs.map(imageID => [fields.postID, imageID])
  return await db.addPostImages(arr)
}

/**
 * @param {number} postImageID
 * @return {}
 * @throw invalid argument error
 */
async function deletePostImage (postImageID) {
  util.checkID(postImageID)
  return await db.deletePostImage(postImageID)
}

/**
 * @param {number} postImageID
 * @return {}
 * @throw invalid argument error
 */
async function getPostImageByID (postImageID) {
  util.checkID(postImageID)
  return await db.getPostImageByID(postImageID)
}

/**
 * @param {number} postID
 * @return {}
 * @throw invalid argument error
 */
async function getAllImageIDsByPostID (postID) {
  util.checkID(postID)
  return await db.getAllImageIDsByPostID(postID)
}

/**
 * @param {number} imageID
 * @return {}
 * @throw invalid argument error
 */
async function getAllPostIDsByImageID (imageID) {
  util.checkID(imageID)
  return await db.getAllPostIDsByImageID(imageID)
}
