import Post from '../model/PostModel.js'
import Item from '../model/ItemModel.js'
import handler from '../util/handler.js'

export default {
  createPostWithItemID,
  createPostWithNewItem,
  deletePost,

  getPostByPostID,
  getAllPostsByUserID,
  getAllPostsByItemID
}

/**
 * @param {number} userID
 * @param {number} itemID
 * @param {string} postTitle
 * @param {number} postRate
 * @param {string} postDescription
 * @param {string} postLocation
 * @param {string|null} postDuration datetime format: '2020-12-31 23:59:59' (UTC), default duration 1 month
 * @return {number|false} postID || false if invalid params
 */
async function createPostWithItemID (userID, itemID, postTitle, postRate, postDescription, postLocation, postDuration = null) {
  const result = await handler.asyncErrorHandler(Post.createPostWithItemID, {
    userID: +userID,
    itemID: +itemID,
    postTitle,
    postRate: +postRate,
    postDescription,
    postLocation,
    postDuration
  }
  )
  return result.insertId ?? false
}
/**
 * @param {number} userID
 * @param {string} itemName
 * @param {string} itemCondition
 * @param {number} itemAge
 * @param {string} postTitle
 * @param {number} postRate
 * @param {string} postDescription
 * @param {string} postLocation
 * @param {string|null} postDuration datetime format: '2020-12-31 23:59:59' (UTC), default duration 1 month
 * @return {number|false} postID || false if invalid params
 */
async function createPostWithNewItem (
  userID,
  itemName,
  itemCondition,
  itemAge,
  postTitle,
  postRate,
  postDescription,
  postLocation,
  postDuration = null
) {
  const itemInsert = await handler.asyncErrorHandler(Item.createItem, { userID: +userID, itemName, itemCondition, itemAge: +itemAge })
  if (!itemInsert) return false

  const result = await handler.asyncErrorHandler(Post.createPostWithItemID, {
    userID: +userID,
    itemID: itemInsert.insertId,
    postTitle,
    postRate: +postRate,
    postDescription,
    postLocation,
    postDuration
  })

  return result.insertId ?? false
}

/**
 * @param {number} postID
 * @return {boolean} true if deleted
 */
async function deletePost (postID) {
  const result = await handler.asyncErrorHandler(Post.deletePost, +postID)
  return result.affectedRows === 1
}

/**
 * @param {number} postID
 */
async function getPostByPostID (postID) {
  return await handler.asyncErrorHandler(Post.getPostByPostID, +postID)
}

/**
 * @param {number} userID
 */
async function getAllPostsByUserID (userID) {
  return await handler.asyncErrorHandler(Post.getAllPostsByUserID, +userID)
}

/**
 * @param {number} itemID
 */
async function getAllPostsByItemID (itemID) {
  return await handler.asyncErrorHandler(Post.getAllPostsByItemID, +itemID)
}
