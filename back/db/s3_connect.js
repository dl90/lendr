import AWS from 'aws-sdk'
import dotenv from 'dotenv'
const config = dotenv.config({ path: '../.env' })

console.log(config.parsed)
AWS.config.update({ region: 'us-west-2' })
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  apiVersion: '2006-03-01'
})

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

function listBuckets () {
  return s3.listBuckets().promise()
}

function getCors () {
  return s3.getBucketCors({ Bucket: process.env.AWS_BUCKET_NAME }).promise()
}

async function x () {
  try {
    const ls = await listBuckets()
    const cors = await getCors()
    const up = await upload('test.txt', 'howdy', 'text')
    console.log(ls)
    console.log(JSON.stringify(cors))
    console.log(up)
  } catch (e) {
    console.log(e)
  }
}

x()

export default { s3, upload, listBuckets, getCors }
