import db from '../db/queries/Post.queries.js'
import util from '../util/util.js'

export default {
  createPostWithItemID,
  deletePost,

  getPostByPostID,
  getAllPostsByUserID,
  getAllPostsByItemID,
  getAllPostsByTagID,
  getAllPostsByTagName,

  updatePostTitle,
  updatePostRate,
  updatePostDescription,
  updatePostLocation,
  updatePostDuration,

  setPostReportFlag,
  incrementView
}

/**
 * @param {object} fields
 * ```
 * fields {
 *    postTitle: [string],
 *    postRate: [number],
 *    postDescription: [string],
 *    postLocation: [string],
 *    postDuration: [string ('2020-12-31 23:59:59' UTC)],
 *    userID: [number],
 *    itemID: [number]
 *  }
 * ```
 * @return {object}
 * ```
 *  ResultSetHeader {
 *    fieldCount: 0,
 *    affectedRows: 1,
 *    insertId: 1,
 *    info: '',
 *    serverStatus: 2,
 *    warningStatus: 0
 *  }
 * ```
 * @throw invalid argument error
 */
async function createPostWithItemID (fields) {
  util.checkEmptyString(fields.postTitle)
  util.validateRate(fields.postRate)
  util.checkEmptyString(fields.postDescription)
  util.checkEmptyString(fields.postLocation)
  if (fields.postDuration) util.validateDateFormat(fields.postDuration)
  util.checkID(fields.userID)
  util.checkID(fields.itemID)

  return await db.createPostWithItemID(fields)
}

/**
 * @param {number} postID
 * @return {object}
 * ```
 *  ResultSetHeader {
 *    fieldCount: 0,
 *    affectedRows: 1,
 *    insertId: 0,
 *    info: '',
 *    serverStatus: 2,
 *    warningStatus: 0
 *  }
 * ```
 * @throw invalid argument error
 */
async function deletePost (postID) {
  util.checkID(postID)
  return await db.deletePost(postID)
}

/**
 * @param {number} postID
 * @return {object}
 */
async function getPostByPostID (postID) {
  util.checkID(postID)
  const post = await db.getPostByPostID(postID)
  return post[0] ?? null
}

/**
 * @param {object} fields
 * ```
 *  { userID: [number] [, reportFlag: [boolean] ] }
 * ```
 * @return {[object]]}
 * @throw invalid argument error
 */
async function getAllPostsByUserID (fields) {
  util.checkID(fields.userID)
  if (fields.reportFlag) util.checkBool(fields.reportFlag)
  return await db.getAllPostsByUserID(fields)
}

/**
 * @param {object} fields
 * ```
 *  { itemID: [number] [, reportFlag: [boolean] ] }
 * ```
 * @return {[object]}
 * @throw invalid argument error
 */
async function getAllPostsByItemID (fields) {
  util.checkID(fields.itemID)
  if (fields.reportFlag) util.checkBool(fields.reportFlag)
  return await db.getAllPostsByItemID(fields)
}

/**
 * @param {object} fields
 * ```
 *  { tagID: [number] [, reportFlag: [boolean] ] }
 * ```
 * @return {[object]}
 * @throw invalid argument error
 */
async function getAllPostsByTagID (fields) {
  util.checkID(fields.tagID)
  if (fields.reportFlag) util.checkBool(fields.reportFlag)
  return await db.getAllPostsByTagID(fields)
}

/**
 * @param {object} fields
 * ```
 *  { tagName: [string] [, reportFlag: [boolean] ] }
 * ```
 * @return {[object]}
 * @throw invalid argument error
 */
async function getAllPostsByTagName (fields) {
  util.checkEmptyString(fields.tagName)
  if (fields.reportFlag) util.checkBool(fields.reportFlag)
  return await db.getAllPostsByTagName(fields)
}

/**
 * @param {object} fields
 * ```
 *  { postID: [number], postTitle: [string]}
 * ```
 * @return {}
 * @throw invalid argument error
 */
async function updatePostTitle (fields) {
  util.checkID(fields.postID)
  util.checkEmptyString(fields.postTitle)
  return await db.updatePostTitle(fields)
}

/**
 * @param {object} fields
 * ```
 *  { postID: [number], postRate: [number: decimal(11,2)] }
 * ```
 * @return {}
 * @throw invalid argument error
 */
async function updatePostRate (fields) {
  util.checkID(fields.postID)
  util.validateRate(fields.postRate)
  return await db.updatePostRate(fields)
}

/**
 * @param {object} fields
 * ```
 *  { postID: [number], postDescription: [string]}
 * ```
 * @return {}
 * @throw invalid argument error
 */
async function updatePostDescription (fields) {
  util.checkID(fields.postID)
  util.checkEmptyString(fields.postDescription)
  return await db.updatePostDescription(fields)
}

/**
 * @param {object} fields
 * ```
 *  { postID: [number], postLocation: [string] }
 * ```
 * @return {}
 * @throw invalid argument error
 */
async function updatePostLocation (fields) {
  util.checkID(fields.postID)
  util.checkEmptyString(fields.postLocation)
  return await db.updatePostDescription(fields)
}

/**
 * @param {object} fields
 * ```
 *  { postID: [number], postDuration: [string: '2020-12-31 23:59:59'] }
 * ```
 * @return {}
 * @throw invalid argument error
 */
async function updatePostDuration (fields) {
  util.checkID(fields.postID)
  util.validateDateFormat(fields.postDuration)
  return await db.updatePostDuration(fields)
}

/**
 * @param {object} fields
 * ```
 *  { postID: [number], reportFlag: [boolean] }
 * ```
 * @return {}
 * @throw invalid argument error
 */
async function setPostReportFlag (fields) {
  util.checkID(fields.postID)
  util.checkBool(fields.reportFlag)
  return await db.setPostReportFlag(fields)
}

/**
 * @param {number} postID
 * @return {}
 * @throw invalid argument error
 */
async function incrementView (postID) {
  util.checkID(postID)
  return await db.incrementView(postID)
}
