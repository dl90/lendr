import path from 'path'
import express from 'express'
import authCheck from '../middleware/authCheck.js'
import multer from 'multer'

// @TODO save as Buffer then uploade to s3
const upload = multer({
  dest: path.join(path.resolve(), '/image-uploads'),
  fileSize: 5000000 // 5MB
})

const router = express.Router()
export default function () {
  /*
    {
      fieldname: 'images',
      originalname: '1.jpg',
      encoding: '7bit',
      mimetype: 'image/jpeg',
      destination: '/Users/don/GitHub/Projects/idsp-lendr/back/image-uploads',
      filename: '0e38f6e02d2ab9377f27af67e63ef082',
      path: '/Users/don/GitHub/Projects/idsp-lendr/back/image-uploads/0e38f6e02d2ab9377f27af67e63ef082',
      size: 8107
    }
  */
  router.post('/single', authCheck, upload.single('image'), (req, res) => {
    if (req.file) res.json(req.file)
  })

  router.post('/multi', authCheck, upload.array('images', 12), (req, res) => {
    if (req.files.length) res.json(req.files)
    console.log(req.files)
  })

  return router
}
