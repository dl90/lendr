import db from '../mysql.connect.js'
const execute = db.dbExecute
const query = db.dbQuery

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
  return await execute(
    'INSERT INTO Tag SET name = ?', [tagName]
  )
}

/**
 * @param {number} postID
 * @return {}
 */
async function deleteTag (tagID) {
  return await execute('DELETE FROM Tag WHERE id = ?', [tagID])
}

/**
 * @param {object} fields
 * ```
 *  { tagName: [string], tagID: [number] }
 * ```
 * @return {}
 */
async function updateTagName (fields) {
  return await execute(
    'UPDATE Tag SET name = ? WHERE id = ?', [fields.tagName, fields.tagID]
  )
}

/**
 * @param {object} fields
 * ```
 *  { tagCount: [number], tagID: [number], tagName: [string] }
 * ```
 * @return {}
 */
async function updateTagCount (fields) {
  return fields.tagID
    ? await execute('UPDATE Tag SET total_count = ? WHERE id = ?', [fields.tagCount, fields.tagID])
    : await execute('UPDATE Tag SET total_count = ? WHERE name = ?', [fields.tagCount, fields.tagName])
}

/**
 * @param {number} tagID
 * @return {}
 */
async function getTagByID (tagID) {
  return await query(
    'SELECT * FROM Tag WHERE id = ?', [tagID]
  )
}

/**
 * @param {string} tagName
 * @return {}
 */
async function getTagByTagName (tagName) {
  return await query('SELECT * FROM Tag WHERE name = ?', [tagName])
}

/**
 * @return {}
 */
async function getAllTag () {
  return await query('SELECT * FROM Tag ORDER BY total_count DESC')
}
