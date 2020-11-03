import express from 'express'
import PostController from '../controller/PostController.js'
import authCheck from '../middleware/authCheck.js'

const router = express.Router()
router.use(authCheck)

export default function () {
  /**
   * @api {put} /post/put                   Create new post and store in db
   * @apiName PutPostNew
   * @apiGroup Post
   *
   * @apiParam {number} itemID
   * @apiParam {string} postTitle
   * @apiParam {number} postRate
   * @apiParam {string} postDescription
   * @apiParam {string} postLocation
   * @apiParam {string|null} [postDuration]
   *
   * @apiSuccess (204) {}                   Success
   * @apiError (400) {}                     Incorrect itemID or update failed
   */
  router.put('/new', async (req, res) => {
    const { itemID, postTitle, postRate, postDescription, postLocation, postDuration } = req.body
    const postID = await PostController.createPostWithItemID(
      req.user.id,
      itemID,
      postTitle,
      postRate,
      postDescription,
      postLocation,
      postDuration
    )

    postID
      ? res.json({ postID })
      : res.sendStatus(400)
  })

  return router
}
