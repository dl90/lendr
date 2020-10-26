import AWS from 'aws-sdk'
import dotenv from 'dotenv'
dotenv.config({ path: '../.env' })

AWS.config.update({ region: 'us-west-2' })
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  apiVersion: '2006-03-01'
})

async function test () {
  const lb = await s3.listBuckets().promise()
  console.log(lb)

  const cors = await s3.getBucketCors({ Bucket: process.env.AWS_BUCKET_NAME }).promise()
  console.log(cors.CORSRules[0])

  const acl = await s3.getBucketAcl({ Bucket: process.env.AWS_BUCKET_NAME }).promise()
  console.log(acl)

  // const policy = await s3.getBucketPolicy({ Bucket: process.env.AWS_BUCKET_NAME }).promise()
  // console.log(JSON.stringify(policy))
}

test().catch(e => console.log(e))

export default { s3 }
