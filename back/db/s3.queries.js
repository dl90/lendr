import s3 from './s3.connect'
import dotenv from 'dotenv'
dotenv.config({ path: '../.env' })

export default {
  upload
}

/**
 * @param {string} fileName
 * @param {*} fileContent
 * @param {string} fileType
 */
function upload (fileName, fileContent, fileType) {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: fileName,
    Body: fileContent,
    Expires: 60,
    ContentType: fileType,
    ACL: 'public-read'
  }
  return s3.upload(params).promise()
}
