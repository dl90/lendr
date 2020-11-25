import db from '../db/queries/PostTag.queries.js'
import util from '../util/util.js'

export default {
  addPostTag,
  deletePostTag,

  getPostTagByID,
  getPostTagByPostIDTagID
}

/**
 * @param {object} fields
 * @param {number} fields.postID
 * @param {number} fields.tagID
 */
async function addPostTag (fields) {
  util.checkID(fields.postID)
  util.checkID(fields.tagID)
  return await db.addPostTag(fields)
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

/**
 * @param {object} fields
 * @param {number} fields.postID
 * @param {number} fields.tagID
 */
async function getPostTagByPostIDTagID (fields) {
  util.checkID(fields.postID)
  util.checkID(fields.tagID)
  const result = await db.getPostTagByPostIDTagID(fields)
  return result[0]
}
