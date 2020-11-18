import express from 'express'
import config from '../util/config.js'
import authCheck from '../middleware/authCheck.js'
import multer from '../middleware/multer.js'
import ImageController from '../controller/ImageController.js'

const router = express.Router()
router.use(authCheck)

export default function () {
  /**
   * @api {post} /image/single              Upload image to s3 and store url to db
   * @apiName PutImageSingle
   * @apiGroup Image
   *
   * @apiParam {file} image                 Image file [jpeg|jpg|png|gif]
   *
   * @apiSuccess (200) {json}               { url }
   * @apiError (400) {}                     Incorrect type or failed to save to db
   */
  router.post('/single', multer.single('image'), async (req, res) => {
    if (!req.file) res.sendStatus(400)
    else {
      await ImageController.addImage(req.user.id, req.file.location)
        ? res.json({ url: req.file.location })
        : res.sendStatus(400)
    }
  })

  /**
   * @api {post} /image/multi               Upload images to s3 and store urls to db
   * @apiName PutImageMulti
   * @apiGroup Image
   *
   * @apiParam {files} images               Image files, 12 max [jpeg|jpg|png|gif]
   *
   * @apiSuccess (200) {json}               { [url, url, ...] }
   * @apiError (400) {}                     Incorrect type or failed to save to db
   */
  router.post('/multi', multer.array('images', config.BATCH_IMAGE_UPLOAD_COUNT), async (req, res) => {
    if (!req.files.length) res.sendStatus(400)
    else {
      const imageURLs = req.files.map(file => file.location)
      await ImageController.addImages(req.user.id, req.files)
        ? res.json({ urls: imageURLs })
        : res.sendStatus(400)
    }
  })

  /**
   * @api {delete} /image/delete            Delete image from s3 and db
   * @apiName DeleteImage
   * @apiGroup Image
   *
   * @apiParam {string} imageURL
   *
   * @apiSuccess (204) {}                   Success
   * @apiError (400) {}                     Incorrect type or failed to save to db
   */
  router.delete('/delete', async (req, res) => {
    await ImageController.deleteImage(req.body.imageURL)
      ? res.sendStatus(204)
      : res.sendStatus(400)
  })

  return router
}
