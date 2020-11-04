import db from '../db/queries/Post.queries.js'
import util from '../util/util.js'

export default {
  createPostWithItemID,
  deletePost,

  getPostByPostID,
  getAllPostsByUserID,
  getAllPostsByItemID
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
 * @param {number} userID
 */
async function getAllPostsByUserID (userID) {
  util.checkID(userID)
  return await db.getAllPostsByUserID(userID)
}

/**
 * @param {number} itemID
 */
async function getAllPostsByItemID (itemID) {
  util.checkID(itemID)
  return await db.getAllPostsByItemID(itemID)
}
