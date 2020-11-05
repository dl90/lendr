import express from 'express'
import PostController from '../controller/PostController.js'
import authCheck from '../middleware/authCheck.js'

const router = express.Router()
router.use(authCheck)

export default function () {
  /**
   * @api {put} /post/put                   Create new post with existing item and store in db
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

  /**
   * @api {put} /post/put                   Create new post with new item and store in db
   * @apiName PutPostNewItem
   * @apiGroup Post
   *
   * @apiParam {string} itemName
   * @apiParam {string} itemCondition
   * @apiParam {number} itemAge
   * @apiParam {string} postTitle
   * @apiParam {number} postRate
   * @apiParam {string} postDescription
   * @apiParam {string} postLocation
   * @apiParam {string|null} [postDuration]
   *
   * @apiSuccess (204) {}                   Success
   * @apiError (400) {}                     Incorrect itemID or update failed
   */
  router.put('/new-item', async (req, res) => {
    const { itemName, itemCondition, itemAge, postTitle, postRate, postDescription, postLocation, postDuration } = req.body
    const postID = await PostController.createPostWithNewItem(
      req.user.id,
      itemName,
      itemCondition,
      itemAge,
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

  /**
   * @api {delete} /post/delete             Delete post from db
   * @apiName DeletePost
   * @apiGroup Post
   *
   * @apiParam {number} postID
   *
   * @apiSuccess (204) {}                   Success
   * @apiError (400) {}                     Incorrect postID or delete failed
   */
  router.delete('/delete', async (req, res) => {
    await PostController.deletePost(req.body.postID)
      ? res.sendStatus(204)
      : res.sendStatus(400)
  })

  /**
   * @api {post} /post/get                  Get post by postID from db
   * @apiName PostGetPost
   * @apiGroup Post
   *
   * @apiParam {number} postID
   *
   * @apiSuccess (200) {json}               Post
   * @apiError (400) {}                     Incorrect postID or get failed
   */
  router.post('/get', async (req, res) => {
    const post = await PostController.getPostByPostID(req.body.postID)
    post
      ? res.json(post)
      : res.sendStatus(400)
  })

  /**
   * @api {get} /post/get                  Get all posts by userID from db
   * @apiName PostGetAllPost
   * @apiGroup Post
   *
   * @apiSuccess (200) {json}               Posts
   * @apiError (400) {}                     Incorrect postID or get failed
   */
  router.get('/get', async (req, res) => {
    const posts = await PostController.getAllPostsByUserID(req.user.id)
    posts
      ? res.json(posts)
      : res.sendStatus(400)
  })

  return router
}