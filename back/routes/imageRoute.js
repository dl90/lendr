import express from 'express'
import authCheck from '../middleware/authCheck.js'
import multer from '../middleware/multer.js'
import ImageController from '../controller/ImageController.js'

const BATCH_IMAGE_UPLOAD_SIZE = 12
const router = express.Router()
router.use(authCheck)

export default function () {
  /**
   * @api {post} /image/single              Uploads image to s3 and store url to db
   * @apiName PostImageSingle
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
   * @api {post} /image/multi               Uploads images to s3 and store urls to db
   * @apiName PostImageMulti
   * @apiGroup Image
   *
   * @apiParam {files} images               Image files, 12 max [jpeg|jpg|png|gif]
   *
   * @apiSuccess (200) {json}               { [url, url, ...] }
   * @apiError (400) {}                     Incorrect type or failed to save to db
   */
  router.post('/multi', multer.array('images', BATCH_IMAGE_UPLOAD_SIZE), async (req, res) => {
    if (!req.files.length) res.sendStatus(400)
    else {
      const imageURLs = req.files.map(file => file.location)
      await ImageController.addImages(req.user.id, req.files)
        ? res.json({ urls: imageURLs })
        : res.sendStatus(400)
    }
  })

  /**
   * @api {post} /image/delete              Deletes image from s3 and db
   * @apiName PostImageDelete
   * @apiGroup Image
   *
   * @apiParam {string} imageURL            imageURL
   *
   * @apiSuccess (200) {}                   OK
   * @apiError (400) {}                     Incorrect type or failed to save to db
   */
  router.post('/delete', async (req, res) => {
    const { imageURL } = req.body
    await ImageController.deleteImage(imageURL)
      ? res.sendStatus(200)
      : res.sendStatus(400)
  })

  return router
}
