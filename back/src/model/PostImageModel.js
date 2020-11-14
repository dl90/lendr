import db from '../db/queries/PostImage.queries.js'
import util from '../util/util.js'

export default {
  addPostImage,
  deletePostImage,
  getPostImageByID,
  getAllImageIDsByPostID,
  getAllPostIDsByImageID
}

/**
 * @param {object} fields
 * ```
 *  { imageID: [number], postID: [number] }
 * ```
 * @return {}
 * @throw invalid argument error
 */
async function addPostImage (fields) {
  util.checkID(fields.imageID)
  util.checkID(fields.postID)
  return await db.addPostImage(fields.postID, fields.imageID)
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
