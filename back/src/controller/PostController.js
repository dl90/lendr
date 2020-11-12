import handler from '../util/handler.js'
import Post from '../model/PostModel.js'
import Item from '../model/ItemModel.js'
import PostTag from '../model/PostTagModel.js'

import TagController from './TagController.js'

export default {
  createPostWithItemID,
  createPostWithNewItem,
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
  incrementView,

  addPostTagWithTagID,
  addPostTagWithNewTag

  // addPostImage
  // addPostImages
  // deletePostImage
  // getAllPostImages
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
  const result = await handler.asyncErrorHandler(
    Post.createPostWithItemID,
    {
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
  const itemInsert = await handler.asyncErrorHandler(
    Item.createItem,
    { userID: +userID, itemName, itemCondition, itemAge: +itemAge }
  )
  if (!itemInsert) return false

  const result = await handler.asyncErrorHandler(
    Post.createPostWithItemID,
    {
      userID: +userID,
      itemID: itemInsert.insertId,
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
 * @param {number} postID
 * @return {boolean} true if deleted
 */
async function deletePost (userID, postID) {
  const result = await handler.asyncErrorHandler(Post.deletePost, { userID: +userID, postID: +postID })
  return result.affectedRows === 1
}

/* ======================================== GET ======================================== */

/**
 * @param {number} postID
 * @return {object|false}
 */
async function getPostByPostID (postID) {
  await handler.asyncErrorHandler(Post.incrementView, +postID)
  return await handler.asyncErrorHandler(Post.getPostByPostID, +postID)
}

/**
 * @param {number} userID
 * @param {boolean|null} postFlag
 * @return {[object]|false}
 */
async function getAllPostsByUserID (userID, postFlag = undefined) {
  return await handler.asyncErrorHandler(Post.getAllPostsByUserID,
    { userID: +userID, postFlag })
}

/**
 * @param {number} userID
 * @param {number} itemID
 * @param {boolean|null} postFlag
 * @return {[object]|false}
 */
async function getAllPostsByItemID (userID, itemID, postFlag = undefined) {
  const fields = { userID: +userID, itemID: +itemID }
  fields.postFlag = (postFlag === 'true')
  return await handler.asyncErrorHandler(Post.getAllPostsByItemID,
    fields)
}

/**
 * @param {number} tagID
 * @param {boolean|undefined} postFlag
 * @return {[object]|false}
 */
async function getAllPostsByTagID (tagID, postFlag = undefined) {
  const fields = { tagID: +tagID }
  if (postFlag) fields.postFlag = (postFlag === 'true')
  return await handler.asyncErrorHandler(Post.getAllPostsByTagID, fields)
}

/**
 * @param {number} tagName
 * @param {boolean|undefined} postFlag
 * @return {[object]|false}
 */
async function getAllPostsByTagName (tagName, postFlag = undefined) {
  return await handler.asyncErrorHandler(Post.getAllPostsByTagName,
    { tagName, postFlag })
}

/* ======================================== UPDATE ======================================== */

/**
 * @param {number} userID
 * @param {number} postID
 * @param {string} postTitle
 * @return {boolean} true if updated
 */
async function updatePostTitle (userID, postID, postTitle) {
  const result = await handler.asyncErrorHandler(Post.updatePostTitle,
    { userID: +userID, postID: +postID, postTitle })
  return result.affectedRows === 1
}

/**
 * @param {number} userID
 * @param {number} postID
 * @param {number} postRate decimal(11,2)
 * @return {boolean} true if updated
 */
async function updatePostRate (userID, postID, postRate) {
  const result = await handler.asyncErrorHandler(Post.updatePostRate,
    { userID: +userID, postID: +postID, postRate: +postRate })
  return result.affectedRows === 1
}

/**
 * @param {number} userID
 * @param {number} postID
 * @param {string} postDescription
 * @return {boolean} true if updated
 */
async function updatePostDescription (userID, postID, postDescription) {
  const result = await handler.asyncErrorHandler(Post.updatePostDescription,
    { userID: +userID, postID: +postID, postDescription })
  return result.affectedRows === 1
}

/**
 * @param {number} userID
 * @param {number} postID
 * @param {string} postLocation
 * @return {boolean} true if updated
 */
async function updatePostLocation (userID, postID, postLocation) {
  const result = await handler.asyncErrorHandler(Post.updatePostLocation,
    { userID: +userID, postID: +postID, postLocation })
  return result.affectedRows === 1
}

/**
 * @param {number} userID
 * @param {number} postID
 * @param {string} postDuration '2020-12-31 23:59:59'
 * @return {boolean} true if updated
 */
async function updatePostDuration (userID, postID, postDuration) {
  const result = await handler.asyncErrorHandler(Post.updatePostDuration,
    { userID: +userID, postID: +postID, postDuration })
  return result.affectedRows === 1
}

/**
 * @param {number} postID
 * @param {boolean} reportFlag
 * @return {boolean} true if updated
 */
async function setPostReportFlag (postID, reportFlag) {
  const fields = { postID: +postID }
  fields.reportFlag = (reportFlag === 'true')
  const result = await handler.asyncErrorHandler(Post.setPostReportFlag, fields)
  return result.affectedRows === 1
}

/**
 * @param {number} postID
 * @return {boolean} true if incremented
 */
async function incrementView (postID) {
  const result = await handler.asyncErrorHandler(Post.incrementView, +postID)
  return result.affectedRows === 1
}

/* ======================================== TAG ======================================== */

/**
 * @param {number} postID
 * @param {number} tagID
 * @return {}
 */
async function addPostTagWithTagID (postID, tagID) {
  const result = await handler.asyncErrorHandler(PostTag.addPostTag,
    { postID: +postID, tagID: +tagID })
  return result.insertID
}

/**
 * @param {number} userID
 * @param {number} postID
 * @param {string} tagName
 * @return {number} postTag id
 */
async function addPostTagWithNewTag (userID, postID, tagName) {
  const post = await getPostByPostID(postID)
  if (!post || post.user_id !== +userID) return false

  const tag = await TagController.getTagByTagName(tagName)
  const fields = { postID: +postID }

  if (tag) fields.tagID = +tag.id
  else {
    const newTagID = await TagController.addTag(tagName)
    if (!newTagID) return false
    fields.tagID = +newTagID
  }

  // @TODO check if post already has postTag (currently just throws errors)
  // const postTag = await handler.asyncErrorHandler(PostTag.getPostTagByID, field)
  const result = await handler.asyncErrorHandler(PostTag.addPostTag, fields)
  return result.insertId
}

/* ======================================== Image ======================================== */

async function addPostImage () {

}