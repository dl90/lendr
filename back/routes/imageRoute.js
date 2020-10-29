import express from 'express'
import authCheck from '../middleware/authCheck.js'
import multer from '../middleware/multer.js'

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
      size: 8107
    }
  */
  router.post('/single', authCheck, multer.single('image'), (req, res) => {
    if (req.file) res.json(req.file)
  })

  router.post('/multi', authCheck, multer.array('images', 12), (req, res) => {
    if (req.files.length) res.json(req.files)
  })

  return router
}
