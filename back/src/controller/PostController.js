import handler from '../util/handler.js'

import Post from '../model/PostModel.js'
import Image from '../model/ImageModel.js'
import PostTag from '../model/PostTagModel.js'
import PostImage from '../model/PostImageModel.js'

import TagController from './TagController.js'
import ItemController from './ItemController.js'

export default {
  createPostWithItemID,
  createPostWithNewItem,
  createNewPostComplete,
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
  incrementView,

  addPostTagWithTagID,
  addPostTagWithNewTag,

  addPostImages,
  getAllPostImages,
  deletePostImage
}

// @TODO verify itemID first before creating post

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
  const itemID = await ItemController.createItem(userID, itemName, itemCondition, itemAge)
  if (!itemID) return false

  return await createPostWithItemID(userID, itemID, postTitle, postRate, postDescription, postLocation, postDuration)
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
 * @param {string} tag
 * @param {[objects]} imageArray
 * @param {string|null} postDuration datetime format: '2020-12-31 23:59:59' (UTC), default duration 1 month
 * @return {object}
 * ```
 *  { postID: [number], imagesUploaded: [boolean] }
 * ```
 */
async function createNewPostComplete (
  userID,
  itemName,
  itemCondition,
  itemAge,
  postTitle,
  postRate,
  postDescription,
  postLocation,
  tag,
  imageArray,
  postDuration = null
) {
  const itemID = await ItemController.createItem(userID, itemName, itemCondition, itemAge)
  if (!itemID) return false

  const postID = await createPostWithItemID(userID, itemID, postTitle, postRate, postDescription, postLocation, postDuration)
  if (!postID) return false

  const postTagID = await addPostTagWithNewTag(userID, postID, tag)
  if (!postTagID) return false

  const success = await addPostImages(userID, postID, imageArray)
  return { postID, imagesUploaded: success }
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
 * @param {number} idx
 * @param {number} count
 */
async function getAllPosts (idx, count) {
  return await handler.asyncErrorHandler(Post.getAllPosts,
    { idx: +idx, count: +count })
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
  if (postFlag) fields.postFlag = (postFlag === 'true')
  return await handler.asyncErrorHandler(Post.getAllPostsByItemID,
    fields)
}

/**
 * @param {number} tagID
 * @param {number} idx pagination starting index
 * @param {number} count number of responses
 * @param {boolean|undefined} postFlag
 * @return {[object]|false}
 */
async function getAllPostsByTagID (tagID, idx, count, postFlag = undefined) {
  const fields = { tagID: +tagID, idx: +idx, count: +count }
  if (postFlag) fields.postFlag = (postFlag === 'true')
  return await handler.asyncErrorHandler(Post.getAllPostsByTagID, fields)
}

/**
 * @param {number} tagName
 * @param {number} idx pagination starting index
 * @param {number} count number of responses
 * @param {boolean|undefined} postFlag
 * @return {[object]|false}
 */
async function getAllPostsByTagName (tagName, idx, count, postFlag = undefined) {
  const fields = { tagName, idx: +idx, count: +count }
  if (postFlag) fields.postFlag = (postFlag === 'true')
  return await handler.asyncErrorHandler(Post.getAllPostsByTagName, fields)
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
  const result = await handler.asyncErrorHandler(
    Post.setPostReportFlag,
    fields,
    'PostController: setPostReportFlag - Post model'
  )
  return result.affectedRows === 1
}

/**
 * @param {number} postID
 * @return {boolean} true if incremented
 */
async function incrementView (postID) {
  const result = await handler.asyncErrorHandler(
    Post.incrementView,
    +postID,
    'PostController: incrementView - Post model'
  )
  return result.affectedRows === 1
}

/* ======================================== TAG ======================================== */

/**
 * @param {number} postID
 * @param {number} tagID
 * @return {}
 */
async function addPostTagWithTagID (postID, tagID) {
  const result = await handler.asyncErrorHandler(
    PostTag.addPostTag,
    { postID: +postID, tagID: +tagID },
    'PostController: addPostTagWithTagID - PostTag model'
  )
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
  const result = await handler.asyncErrorHandler(
    PostTag.addPostTag,
    fields,
    'PostController: addPostTagWithNewTag - PostTag model'
  )
  return result.insertId
}

/* ======================================== Image ======================================== */

/**
 * @param {number} userID
 * @param {number} postID
 * @param {[object]} imageArray
 * @return {boolean} true if uploaded && inserted to db
 */
async function addPostImages (userID, postID, imageArray) {
  const length = imageArray.length
  const imageResult = await handler.asyncErrorHandler(
    Image.addImages,
    { userID: +userID, imageArray },
    'PostController: addPostImages - Image model'
  )

  const start = imageResult.insertId
  const imageIDs = Array.from({ length }, (_, i) => i + start)
  const postImageResult = await handler.asyncErrorHandler(
    PostImage.addPostImages,
    { imageIDs, postID: +postID },
    'PostController: addPostImages - PostImage model'
  )
  return postImageResult.affectedRows === length
}

/**
 * @param {number} postID
 * @return {[object]}
 */
async function getAllPostImages (postID) {
  return await handler.asyncErrorHandler(
    PostImage.getAllImageIDsByPostID,
    +postID,
    'PostController: getAllPostImages - PostImage model'
  )
}

/**
 * @param {number} postImageID
 * @return {boolean} true if deleted
 */
async function deletePostImage (postImageID) {
  const result = await handler.asyncErrorHandler(
    PostImage.deletePostImage,
    +postImageID,
    'PostController: deletePostImage - PostImage model'
  )
  return result.affectedRows === 1
}
