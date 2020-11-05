import db from '../db/queries/Tag.queries.js'
import util from '../util/util.js'

export default {
  addTag,
  deleteTag,
  updateTagName,
  updateTagCount,
  getTagByID,
  getTagByTagName,
  getAllTag
}

/**
 * @param {string} tagName
 * @return {}
 */
async function addTag (tagName) {
  util.checkEmptyString(tagName)
  return await db.addTag(tagName)
}

/**
 * @param {number} tagID
 * @return {}
 */
async function deleteTag (tagID) {
  util.checkID(tagID)
  return await db.deleteTag(tagID)
}

/**
 * @param {object} fields
 * ```
 *  { tagID: [number], tagName: [string] }
 * ```
 * @return {}
 */
async function updateTagName (fields) {
  util.checkID(fields.tagID)
  util.checkEmptyString(fields.tagName)
  return await db.updateTagName(fields)
}

/**
 * @param {object} fields
 *
 * ```
 *  {
 *    // can use either id or name
 *    tagID: [number],
 *    tagName: [string],
 *    tagCount: [number]
 *  }
 * ```
 * @return {}
 */
async function updateTagCount (fields) {
  if (fields.tagID) util.checkID(fields.tagID)
  else if (fields.tagName) util.checkEmptyString(fields.tagName)
  else util.invalidArgument(fields)

  util.checkID(fields.tagCount)
  return await db.updateTagCount(fields)
}

/**
 * @param {number} tagID
 * @return {}
 */
async function getTagByID (tagID) {
  util.checkID(tagID)
  return await db.getTagByID(tagID)
}

/**
 * @param {string} tagName
 * @return {}
 */
async function getTagByTagName (tagName) {
  util.checkEmptyString(tagName)
  return await db.getTagByTagName(tagName)
}

/**
 * @return {}
 */
async function getAllTag () {
  return await db.getAllTag()
}
