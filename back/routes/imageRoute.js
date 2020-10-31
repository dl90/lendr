import express from 'express'
import authCheck from '../middleware/authCheck.js'
import multer from '../middleware/multer.js'
import ImageController from '../controller/ImageController.js'

const router = express.Router()
const BATCH_IMAGE_UPLOAD_SIZE = 12
export default function () {
  /**
   * @api {post} /image/single                Uploads image to s3 and store url to db
   * @apiName PostImageSingle
   * @apiGroup Image
   *
   * @apiParam {file} image                   Image file [jpeg|jpg|png|gif]
   *
   * @apiSuccess (200) {json}                 { imageID, url }
   * @apiError (400) {}                       Incorrect type or failed to save to db
   */
  router.post('/single', authCheck, multer.single('image'), async (req, res) => {
    if (!req.file) res.sendStatus(400)
    else {
      const imageID = await ImageController.addImage(req.user.id, req.file.location)
      imageID
        ? res.json({ imageID, url: req.file.location })
        : res.sendStatus(400)
    }
  })

  /**
   * @api {post} /image/multi                 Uploads images to s3 and store urls to db
   * @apiName PostImageMulti
   * @apiGroup Image
   *
   * @apiParam {files} images                 Image file [jpeg|jpg|png|gif]
   *
   * @apiSuccess (200) {}                     OK
   * @apiError (400) {}                       Incorrect type or failed to save to db
   */
  router.post('/multi', authCheck, multer.array('images', BATCH_IMAGE_UPLOAD_SIZE), async (req, res) => {
    if (!req.files.length) res.sendStatus(400)
    else {
      const result = await ImageController.addImages(req.user.id, req.files)
      result
        ? res.sendStatus(200)
        : res.sendStatus(400)
    }
  })

  /**
   * @api {post} /image/delete                Deletes image from s3 and db
   * @apiName PostImageDelete
   * @apiGroup Image
   *
   * @apiParam {number} imageURL              imageURL
   *
   * @apiSuccess (200) {}                     OK
   * @apiError (400) {}                       Incorrect type or failed to save to db
   */
  router.post('/delete', authCheck, async (req, res) => {
    const { imageURL } = req.body
    const result = await ImageController.deleteImage(imageURL)
    result
      ? res.sendStatus(200)
      : res.sendStatus(400)
  })

  return router
}
