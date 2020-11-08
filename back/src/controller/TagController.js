import Tag from '../model/TagModel.js'
import handler from '../util/handler.js'

export default {
  addTag,
  deleteTag,
  updateTagName,
  updateTagCount,
  getTagByID,
  getTagByTagName,
  getAllTags
}

/**
 * @param {string} tagName
 * @return {number|false} tagID || false if failed
 */
async function addTag (tagName) {
  const result = await handler.asyncErrorHandler(Tag.addTag, tagName)
  return result.insertId ?? false
}

/**
 * @param {number} tagID
 * @return {boolean} true if deleted
 */
async function deleteTag (tagID) {
  const result = await handler.asyncErrorHandler(Tag.deleteTag, +tagID)
  return result.affectedRows === 1
}

/**
 * @param {number} tagID
 * @param {string} tagName
 * @return {boolean} true if updated
 */
async function updateTagName (tagID, tagName) {
  const result = await handler.asyncErrorHandler(Tag.updateTag, { tagID: +tagID, tagName })
  return result.affectedRows === 1
}

/**
 * Can update with either tagID || tagName
 * @param {number} tagCount
 * @param {number|null} tagID
 * @param {string|null} tagName
 * @return {boolean} true if updated
 */
async function updateTagCount (tagCount, tagID = null, tagName = null) {
  const result = await handler.asyncErrorHandler(Tag.updateTagCount,
    { tagCount: +tagCount, tagID, tagName }
  )
  return result.affectedRows === 1
}

/**
 * @param {number} tagID
 * @return {object} tag
 */
async function getTagByID (tagID) {
  const result = await handler.asyncErrorHandler(Tag.getTagByID, +tagID)
  return result.length ? result[0] : false
}

/**
 * @param {string} tagName
 * @return {object} tag
 */
async function getTagByTagName (tagName) {
  const result = await handler.asyncErrorHandler(Tag.getTagByTagName, tagName)
  return result.length ? result[0] : false
}

/**
 * @return {[object]} tags
 */
async function getAllTags () {
  return await handler.asyncErrorHandler(Tag.getAllTag)
}
