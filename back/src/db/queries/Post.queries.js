import db from '../mysql.connect.js'
const execute = db.dbExecute
const query = db.dbQuery

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
 *  {
 *    postTitle: [string],
 *    postRate: [decimal(11, 2)],
 *    postDescription: [string],
 *    postLocation: [string],
 *    postDuration: [timestamp],
 *    userID: [number],
 *    itemID: [number]
 *  }
 * ```
 * @return {}
 */
async function createPostWithItemID (fields) {
  const { postTitle, postRate, postDescription, postLocation, postDuration, userID, itemID } = fields

  if (postDuration) {
    return await execute(
      'INSERT INTO Post SET title = ?, rate = ?, post_description = ?, location = ?, duration = ?, user_id = ?, item_id = ?',
      [postTitle, postRate, postDescription, postLocation, postDuration, userID, itemID])
  }
  return await execute('INSERT INTO Post SET title = ?, rate = ?, post_description = ?, location = ?, user_id = ?, item_id = ?',
    [postTitle, postRate, postDescription, postLocation, userID, itemID])
}

/**
 * @param {number} postID
 * @return {}
 */
async function deletePost (postID) {
  return await execute('DELETE FROM Post WHERE id = ?', [postID])
}

/**
 * @param {number} postID
 * @return {[object]} single post [ BinaryRow { data } ]
 */
async function getPostByPostID (postID) {
  return await query('SELECT * FROM Post WHERE id = ? LIMIT 1', [postID])
}

/**
 * @param {object} fields
 * ```
 *  { userID: [number] [, reportFlag: [boolean] ] }
 * ```
 * @return {[object]} multiple posts [ BinaryRow { data } ]
 */
async function getAllPostsByUserID (fields) {
  return fields.reportFlag === undefined
    ? await query('SELECT * FROM Post WHERE user_id = ? ORDER BY created_on DESC', [fields.userID])
    : await query('SELECT * FROM post WHERE user_id = ? AND report_flag = ? ORDER BY created_on DESC',
      [fields.userID, fields.reportFlag])
}

/**
 * @param {object} fields
 * ```
 *  { itemID: [number] [, reportFlag: [boolean] ] }
 * ```
 * @return {[object]} multiple posts [ BinaryRow { data } ]
 */
async function getAllPostsByItemID (fields) {
  return fields.reportFlag === undefined
    ? await query('SELECT * FROM Post WHERE item_id = ? ORDER BY created_on DESC', [fields.itemID])
    : await query('SELECT * FROM post WHERE item_id = ? AND report_flag = ? ORDER BY created_on DESC',
      [fields.itemID, fields.reportFlag])
}

/**
 * @param {object} fields
 * ```
 *  { tagID: [number] [, reportFlag: [boolean] ] }
 * ```
 * @return {[object]} multiple posts [ BinaryRow { data } ]
 */
async function getAllPostsByTagID (fields) {
  console.log(fields)
  return fields.reportFlag === undefined
    ? await query(
      `SELECT * FROM Post
       JOIN PostTag ON Post.id = PostTag.post_id
       WHERE PostTag.tag_id = ?
       ORDER BY Post.created_on DESC`,
      [fields.tagID])
    : await query(
      `SELECT * FROM Post
       JOIN PostTag ON Post.id = PostTag.post_id
       WHERE PostTag.tag_id = ? AND Post.report_flag = ?
       ORDER BY Post.created_on DESC`,
      [fields.tagID, fields.reportFlag])
}

/**
 * @param {object} fields
 * ```
 *  { tagName: [string] [, reportFlag: [boolean] ] }
 * ```
 * @return {[object]} multiple posts [ BinaryRow { data } ]
 */
async function getAllPostsByTagName (fields) {
  return fields.reportFlag === undefined
    ? await query(
      `SELECT Post.* FROM Post
       JOIN PostTag ON Post.id = PostTag.post_id
       JOIN Tag ON Tag.id = PostTag.tag_id
       WHERE Tag.name = ?
       ORDER BY Post.created_on DESC`,
      [fields.tagName])
    : await query(
      `SELECT Post.* FROM Post
       JOIN PostTag ON Post.id = PostTag.post_id
       JOIN Tag ON Tag.id = PostTag.tag_id
       WHERE Tag.name = ? AND Post.report_flag = ?
       ORDER BY Post.created_on DESC`,
      [fields.tagName, fields.reportFlag])
}

/**
 * @param {object} fields
 * ```
 *  { postID: [number], postTitle: [string] }
 * ```
 * @return {}
 */
async function updatePostTitle (fields) {
  return await execute('UPDATE Post SET title = ? WHERE id = ?',
    [fields.postTitle, fields.postID])
}

/**
 * @param {object} fields
 * ```
 *  { postID: [number], postRate: [number: decimal(11,2)] }
 * ```
 * @return {}
 */
async function updatePostRate (fields) {
  return await execute('UPDATE Post SET rate = ? WHERE id = ?',
    [fields.postRate, fields.postID])
}

/**
 * @param {object} fields
 * ```
 *  { postID: [number], postDescription: [string] }
 * ```
 * @return {}
 */
async function updatePostDescription (fields) {
  return await execute('UPDATE Post SET post_description = ? WHERE id = ?',
    [fields.postDescription, fields.postID])
}

/**
 * @param {object} fields
 * ```
 *  { postID: [number], postLocation: [string] }
 * ```
 * @return {}
 */
async function updatePostLocation (fields) {
  return await execute('UPDATE Post SET location = ? WHERE id = ?',
    [fields.postLocation, fields.postID])
}

/**
 * @param {object} fields
 * ```
 *  { postID: [number], postDuration: [string: '2020-12-31 23:59:59'] }
 * ```
 * @return {}
 */
async function updatePostDuration (fields) {
  return await execute('UPDATE Post SET duration = ? WHERE id = ?',
    [fields.postDuration, fields.postID]
  )
}

/**
 * @param {object} fields
 * ```
 *  { postID: [number], reportFlag: [boolean] }
 * ```
 * @return {}
 */
async function setPostReportFlag (fields) {
  return await execute('UPDATE Post set report_flag = ? WHERE id = ?',
    [fields.reportFlag, fields.postID]
  )
}

/**
 * @param {number} postID
 * @return {}
 */
async function incrementView (postID) {
  return await execute('UPDATE Post set views = views + 1 WHERE id = ?',
    [postID]
  )
}
