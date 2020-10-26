import s3 from './s3.connect.js'
import dotenv from 'dotenv'
dotenv.config({ path: '../.env' })

export default {
  uploadImage,
  deleteImage
}

/**
 * @param {string} fileName
 * @param {object|string} fileContent
 */
function uploadImage (fileName, fileContent) {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: fileName,
    Body: fileContent,
    // ContentType: fileType,
    ACL: 'public-read'
  }
  return s3.upload(params).promise()
}

function deleteImage (fileName) {
  return s3.deleteObject({ Key: fileName }).promise()
}

uploadImage('test.txt', 'abcdefg').then(res => console.log(res)).catch(e => console.log(e))
