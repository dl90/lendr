import db from '../db/queries/Post.queries.js'
import util from '../util/util.js'

export default {
  createPostWithItemID
}

/**
 * @param {object} fields { postTitle, postRate, postDescription, postLocation, postDuration, userID, itemID }
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
  const { postTitle, postRate, postDescription, postLocation, postDuration, userID, itemID } = fields
  util.checkEmptyString(postTitle)
  util.validateRate(postRate)
  util.checkEmptyString(postDescription)
  util.checkEmptyString(postLocation)
  if (postDuration) util.validateDateFormat(postDuration)
  util.checkID(userID)
  util.checkID(itemID)

  return await db.createPostWithItemID(fields)
}
