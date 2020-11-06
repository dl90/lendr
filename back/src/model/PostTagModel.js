import db from '../db/queries/PostTag.queries.js'
import util from '../util/util.js'

export default {
  addPostTag,
  deletePostTag,
  getPostTagByID
}

/**
 * @param {object} fields
 * ```
 * { postID: [number], tagID: [number] }
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
async function addPostTag (fields) {
  util.checkID(fields.postID)
  util.checkID(fields.tagID)
  return await db.addPostTag(fields.postID, fields.tagID)
}

/**
 * @param {number} postTagID
 */
async function deletePostTag (postTagID) {
  util.checkID(postTagID)
  if (util.DB_ENTRY_CHECK) await getPostTagByID(postTagID)
  return await db.deletePostTag(postTagID)
}

/**
 * @param {number} postTagID
 */
async function getPostTagByID (postTagID) {
  util.checkID(postTagID)
  return await db.getPostTagByID(postTagID)
}
