import AWS from 'aws-sdk'
import dotenv from 'dotenv'
dotenv.config({ path: '../.env' })

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

async function test () {
  try {
    // const up = await upload('test.txt', 'howdy', 'text')
    const lb = await s3.listBuckets().promise()
    const cors = await s3.getBucketCors({ Bucket: process.env.AWS_BUCKET_NAME }).promise()
    const acl = await s3.getBucketAcl({ Bucket: process.env.AWS_BUCKET_NAME }).promise()
    // const policy = await s3.getBucketPolicy({ Bucket: process.env.AWS_BUCKET_NAME }).promise()

    // console.log(JSON.stringify(up))
    console.log(JSON.stringify(lb))
    console.log(JSON.stringify(cors))
    console.log(JSON.stringify(acl))
    // console.log(JSON.stringify(policy))
  } catch (e) {
    console.log(e)
  }
}

test()

export default { s3, upload }
