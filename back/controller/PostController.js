import Post from '../model/PostModel.js'
import handler from '../util/handler.js'

export default {
  createPostWithItemID
}

/**
 * @param {number} userID
 * @param {number} itemID
 * @param {string} postTitle
 * @param {number} postRate
 * @param {string} postDescription
 * @param {string} postLocation
 * @param {string|null} postDuration
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
