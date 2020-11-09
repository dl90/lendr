import express from 'express'
import TagController from '../controller/TagController.js'
import authCheck from '../middleware/authCheck.js'

const router = express.Router()
router.use(authCheck)

export default function () {
  /**
   * @api {put} /tag/create                Create tag and store in db
   * @apiName PutCreateTag
   * @apiGroup Tag
   *
   * @apiParam {string} tagName
   *
   * @apiSuccess (200) {json}               tag ID
   * @apiError (400) {}                     Incorrect params or create failed
   */
  router.put('/create', async (req, res) => {
    const tagID = await TagController.addTag(req.body.tagName)
    tagID
      ? res.json({ tagID })
      : res.sendStatus(400)
  })

  /**
   * @api {get} /tag/all                    Get all tags from db
   * @apiName GetAllTags
   * @apiGroup Tag
   *
   * @apiSuccess (200) {json}               tags
   * @apiError (400) {}                     get failed
   */
  router.get('/all', async (req, res) => {
    const tags = await TagController.getAllTags()
    tags
      ? res.json(tags)
      : res.sendStatus(400)
  })

  return router
}
