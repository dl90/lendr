import path from 'path'
import multer from 'multer'
import multerS3 from 'multer-s3'
import s3 from '../db/s3.connect.js'
import dotenv from 'dotenv'
dotenv.config({ path: '../.env' })

export default multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_BUCKET_NAME,
    acl: 'public-read',
    fileSize: 5000000, // 5MB
    ContentType: multerS3.AUTO_CONTENT_TYPE,
    ContentDisposition: 'inline',
    metadata: (req, file, cb) => {
      cb(null, Object.assign({}, file, req.user))
    },
    key: (req, file, cb) => {
      cb(null, path.basename(file.originalname, path.extname(file.originalname)) + '-' + Date.now() + path.extname(file.originalname))
    },
    fileFilter: (req, file, cb) => {
      checkFileType(file, cb)
    }
  })
})

function checkFileType (file, cb) {
  const filetypes = /jpeg|jpg|png|gif/
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
  const mimetype = filetypes.test(file.mimetype)
  return mimetype && extname ? cb(null, true) : cb(new Error('wrong type'))
}
