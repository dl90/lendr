import s3 from './s3.connect.js'
import dotenv from 'dotenv'
dotenv.config({ path: '../.env' })

export default {
  uploadImage,
  deleteImage
}

const BASE = {
  Bucket: process.env.AWS_BUCKET_NAME,
  ACL: 'public-read'
}

/**
 * @param {string} Key
 * @param {object|string} Body
 */
function uploadImage (Key, Body) {
  const params = { ...BASE, Key, Body }
  return s3.upload(params).promise()
}

/**
 * @param {string} Key
 */
function deleteImage (Key) {
  const params = { ...BASE, Key }
  delete params.ACL
  return s3.deleteObject(params).promise()
}
