import Image from '../model/ImageModel.js'
import handler from '../util/handler.js'
import s3 from '../db/s3.queries.js'

export default {
  getImageByImageID,
  getAllImagesByUserID,

  addImage,
  addImages,
  deleteImage,
  updateImageURL
}

/**
 * @param {number} imageID
 * @return {object|false} image
 */
async function getImageByImageID (imageID) {
  return await handler.asyncErrorHandler(
    Image.getImageByImageID, imageID
  )
}

/**
 * @param {number} userID
 * @return {[object]|false} array of images
 */
async function getAllImagesByUserID (userID) {
  return await handler.asyncErrorHandler(
    Image.getAllImagesByUserID, userID
  )
}

/**
 * @param {number} userID
 * @param {string} imageURL
 * @return {number|false} imageID
 */
async function addImage (userID, imageURL) {
  const result = await handler.asyncErrorHandler(
    Image.addImage, { imageURL, userID }
  )
  return result.insertId
}

/**
 * @param {number} userID
 * @param {[object]} imageArray
 */
async function addImages (userID, imageArray) {
  const result = await handler.asyncErrorHandler(
    Image.addImages, { userID, imageArray }
  )
  return result.affectedRows === imageArray.length ? result.insertId : false
}

/**
 * @param {number} imageURL
 * @return {boolean} true if deleted
 */
async function deleteImage (imageURL) {
  const result = await handler.asyncErrorHandler(Image.deleteImage, imageURL)
  await handler.asyncErrorHandler(
    s3.deleteImage, imageURL.substring(imageURL.lastIndexOf('/') + 1)
  )
  return result.affectedRows === 1
}

/**
 * @param {number} imageID
 * @param {string} newImageURL
 * @return {boolean} true if updated
 */
async function updateImageURL (imageID, newImageURL) {
  const fields = { imageID, imageURL: newImageURL }
  const result = await handler.asyncErrorHandler(Image.updateImage, fields)
  return result.changedRows === 1
}
