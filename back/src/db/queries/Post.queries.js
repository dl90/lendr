import db from '../mysql.connect.js'
const execute = db.dbExecute
const query = db.dbQuery

export default {
  createPostWithItemID,
  deletePost,

  getPostByPostID,
  getAllPosts,
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
 * @param {object} fields
 * ```
 *  { userID: [number], postID: [number] }
 * ```
 * @return {}
 */
async function deletePost (fields) {
  return await execute('DELETE FROM Post WHERE id = ? AND user_id = ?', [fields.postID, fields.userID])
}

/**
 * @param {number} postID
 * @return {[object]} single post [ BinaryRow { data } ]
 */
async function getPostByPostID (postID) {
  return await query(
    `SELECT Post.*, JSON_ARRAYAGG(Image.url) AS 'images' FROM Post
     LEFT JOIN PostImage ON PostImage.post_id = Post.id
     LEFT JOIN Image ON PostImage.image_id = Image.id
     WHERE Post.id = ? GROUP BY Post.id`,
    [postID])
}

/**
 * @param {object} fields
 * ```
 *  { idx: [number], count: [number] }
 * ```
 */
async function getAllPosts (fields) {
  return await query(
    `SELECT Post.*, JSON_ARRAYAGG(Image.url) AS 'images' FROM Post
    LEFT JOIN PostImage ON PostImage.post_id = Post.id
    LEFT JOIN Image ON PostImage.image_id = Image.id
    GROUP BY Post.id
    ORDER BY Post.created_on DESC
    LIMIT ?, ?`, [fields.idx, fields.count])
}

/**
 * @param {object} fields
 * ```
 *  { userID: [number] [, reportFlag: [boolean] ] }
 * ```
 * @return {[object]} multiple posts [ BinaryRow { data } ]
 */
async function getAllPostsByUserID (fields) {
  const base = (query) =>
    `SELECT Post.*, JSON_ARRAYAGG(Image.url) AS 'images' FROM Post
     LEFT JOIN PostImage ON PostImage.post_id = Post.id
     LEFT JOIN Image ON PostImage.image_id = Image.id
     ${query}
     GROUP BY Post.id
     ORDER BY Post.created_on DESC`

  const notFlagged = base('WHERE Post.user_id = ?')
  const flagged = base('WHERE Post.user_id = ? AND Post.report_flag = ?')
  return fields.reportFlag === undefined
    ? await query(notFlagged, [fields.userID])
    : await query(flagged, [fields.userID, fields.reportFlag])
}

/**
 * @param {object} fields
 * ```
 *  { userID: [number], itemID: [number] [, reportFlag: [boolean] ] }
 * ```
 * @return {[object]} multiple posts [ BinaryRow { data } ]
 */
async function getAllPostsByItemID (fields) {
  const base = (query) =>
    `SELECT Post.*, JSON_ARRAYAGG(Image.url) AS 'images' FROM Post
     LEFT JOIN PostImage ON PostImage.post_id = Post.id
     LEFT JOIN Image ON PostImage.image_id = Image.id
     ${query}
     GROUP BY Post.id
     ORDER BY Post.created_on DESC`

  const notFlagged = base('WHERE Post.user_id = ? AND Post.item_id = ?')
  const flagged = base('WHERE Post.user_id = ? AND Post.report_flag = ? AND Post.report_flag = ?')
  return fields.reportFlag === undefined
    ? await query(notFlagged, [fields.userID, fields.itemID])
    : await query(flagged, [fields.userID, fields.itemID, fields.reportFlag])
}

/**
 * @param {object} fields
 * @param {string} fields.tagID
 * @param {number} fields.idx
 * @param {number} fields.count
 * @param {boolean|undefined} fields.reportFlag
 * @return {[object]} multiple posts [ BinaryRow { data } ]
 */
async function getAllPostsByTagID (fields) {
  const base = (query) =>
    `SELECT Post.*, JSON_ARRAYAGG(Image.url) AS 'images' FROM Post
     LEFT JOIN PostTag ON Post.id = PostTag.post_id
     LEFT JOIN PostImage ON PostImage.post_id = Post.id
     LEFT JOIN Image ON PostImage.image_id = Image.id
     ${query}
     GROUP BY Post.id
     ORDER BY Post.created_on DESC
     LIMIT ?, ?`

  const notFlagged = base('WHERE PostTag.tag_id = ?')
  const flagged = base('WHERE PostTag.tag_id = ? AND Post.report_flag = ?')
  return fields.reportFlag === undefined
    ? await query(notFlagged, [fields.tagID, fields.idx, fields.count])
    : await query(flagged, [fields.tagID, fields.reportFlag, fields.idx, fields.count])
}

/**
 * @param {object} fields
 * @param {string} fields.tagName
 * @param {number} fields.idx
 * @param {number} fields.count
 * @param {boolean|undefined} fields.reportFlag
 * @return {[object]} multiple posts [ BinaryRow { data } ]
 */
async function getAllPostsByTagName (fields) {
  const base = (query) =>
    `SELECT Post.*, JSON_ARRAYAGG(Image.url) AS 'images' FROM Post
     LEFT JOIN PostTag ON Post.id = PostTag.post_id
     LEFT JOIN PostImage ON PostImage.post_id = Post.id
     LEFT JOIN Image ON PostImage.image_id = Image.id
     LEFT JOIN Tag ON Tag.id = PostTag.tag_id
     ${query}
     GROUP BY Post.id
     ORDER BY Post.created_on DESC
     LIMIT ?, ?`

  const notFlagged = base('WHERE Tag.name = ?')
  const flagged = base('WHERE Tag.name = ? AND Post.report_flag = ?')
  return fields.reportFlag === undefined
    ? await query(notFlagged, [fields.tagName, fields.idx, fields.count])
    : await query(flagged, [fields.tagName, fields.reportFlag, fields.idx, fields.count])
}

/**
 * @param {object} fields
 * ```
 *  { userID: [number], postID: [number], postTitle: [string] }
 * ```
 * @return {}
 */
async function updatePostTitle (fields) {
  return await execute('UPDATE Post SET title = ? WHERE id = ? AND user_id = ?',
    [fields.postTitle, fields.postID, fields.userID])
}

/**
 * @param {object} fields
 * ```
 *  { userID: [number], postID: [number], postRate: [number: decimal(11,2)] }
 * ```
 * @return {}
 */
async function updatePostRate (fields) {
  return await execute('UPDATE Post SET rate = ? WHERE id = ? AND user_id = ?',
    [fields.postRate, fields.postID, fields.userID])
}

/**
 * @param {object} fields
 * ```
 *  { userID: [number], postID: [number], postDescription: [string] }
 * ```
 * @return {}
 */
async function updatePostDescription (fields) {
  return await execute('UPDATE Post SET post_description = ? WHERE id = ? AND user_id = ?',
    [fields.postDescription, fields.postID, fields.userID])
}

/**
 * @param {object} fields
 * ```
 *  { userID: [number], postID: [number], postLocation: [string] }
 * ```
 * @return {}
 */
async function updatePostLocation (fields) {
  return await execute('UPDATE Post SET location = ? WHERE id = ? AND user_id = ?',
    [fields.postLocation, fields.postID, fields.userID])
}

/**
 * @param {object} fields
 * ```
 *  { userID: [number], postID: [number], postDuration: [string: '2020-12-31 23:59:59'] }
 * ```
 * @return {}
 */
async function updatePostDuration (fields) {
  return await execute('UPDATE Post SET duration = ? WHERE id = ? AND user_id = ?',
    [fields.postDuration, fields.postID, fields.userID]
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
