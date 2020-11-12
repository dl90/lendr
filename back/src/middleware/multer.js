import path from 'path'
import multer from 'multer'
import multerS3 from 'multer-s3'
import s3 from '../db/s3.connect.js'
import dotenv from 'dotenv'
dotenv.config({ path: '../.env' })

const FILE_SIZE = 5000000 // 5MB
export default multer({
  fileSize: FILE_SIZE,
  fileFilter: (_req, file, cb) => {
    checkFileType(file, cb)
  },
  storage: multerS3({
    s3,
    size: FILE_SIZE,
    bucket: process.env.AWS_BUCKET_NAME,
    acl: 'public-read',
    ContentType: multerS3.AUTO_CONTENT_TYPE,
    ContentDisposition: 'inline',
    metadata: (req, file, cb) => {
      cb(null, { ...file, id: req.user.id.toString(), email: req.user.email })
    },
    key: (req, file, cb) => {
      cb(null, `${req.user.id}_${Date.now()}` + path.extname(file.originalname).toLowerCase())
    }
  })
})

function checkFileType (file, cb) {
  const filetypes = /jpeg|jpg|png|gif/
  return filetypes.test(file.mimetype) && filetypes.test(path.extname(file.originalname).toLowerCase())
    ? cb(null, true)
    : cb(null, false)
}
