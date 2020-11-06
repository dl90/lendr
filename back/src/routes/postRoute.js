import express from 'express'
import PostController from '../controller/PostController.js'
import authCheck from '../middleware/authCheck.js'

const router = express.Router()
router.use(authCheck)

export default function () {
  /**
   * @api {put} /post/put                   Create new post with existing item
   * @apiName NewPostWithExistingItem
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
   * @apiError (400) {}                     Incorrect itemID || insert failed
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
   * @api {put} /post/put                   Create new post with new item
   * @apiName NewPostWIthNewItem
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
   * @apiError (400) {}                     Incorrect itemID || insert failed
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
   * @api {delete} /post/delete             Delete post
   * @apiName DeletePost
   * @apiGroup Post
   *
   * @apiParam {number} postID
   *
   * @apiSuccess (204) {}                   Success
   * @apiError (400) {}                     Incorrect postID || delete failed
   */
  router.delete('/delete', async (req, res) => {
    await PostController.deletePost(req.body.postID)
      ? res.sendStatus(204)
      : res.sendStatus(400)
  })

  /**
   * @api {post} /post/get                  Get post by postID
   * @apiName GetPostByPostID
   * @apiGroup Post
   *
   * @apiParam {number} postID
   *
   * @apiSuccess (200) {json}               Post
   * @apiError (400) {}                     Incorrect postID || get failed
   */
  router.post('/get', async (req, res) => {
    const post = await PostController.getPostByPostID(req.body.postID)
    post
      ? res.json(post)
      : res.sendStatus(400)
  })

  /**
   * @api {get} /post/get                   Get all posts by userID
   * @apiName GetAllPostsFromCurrentUser
   * @apiGroup Post
   *
   * @apiSuccess (200) {json}               Posts
   * @apiError (400) {}                     Get failed
   */
  router.get('/get', async (req, res) => {
    const posts = await PostController.getAllPostsByUserID(req.user.id)
    posts
      ? res.json(posts)
      : res.sendStatus(400)
  })

  /**
   * @api {post} /post/get-user-id          Get all posts form userID
   * @apiName GetAllPostsFromUserID
   * @apiGroup Post
   *
   * @apiParam {number} userID
   *
   * @apiSuccess (200) {json}               Posts
   * @apiError (400) {}                     Incorrect userID || get failed
   */
  router.post('/get-user-id', async (req, res) => {
    const posts = await PostController.getAllPostsByUserID(req.body.userID)
    posts
      ? res.json(posts)
      : res.sendStatus(400)
  })

  /**
   * @api {post} /post/get-item-id          Get all posts by itemID
   * @apiName GetAllPostWithItemID
   * @apiGroup Post
   *
   * @apiParam {number} itemID
   *
   * @apiSuccess (200) {json}               Posts
   * @apiError (400) {}                     Incorrect itemID || get failed
   */
  router.post('/get-item-id', async (req, res) => {
    const posts = await PostController.getAllPostsByItemID(req.body.itemID)
    posts
      ? res.json(posts)
      : res.sendStatus(400)
  })

  /**
   * @api {post} /post/get-tag-id          Get all posts by tagID
   * @apiName GetAllPostWithTagID
   * @apiGroup Post
   *
   * @apiParam {number} tagID
   *
   * @apiSuccess (200) {json}               Posts
   * @apiError (400) {}                     Incorrect tagID || get failed
   */
  router.post('/get-tag-id', async (req, res) => {
    const posts = await PostController.getAllPostsByTagID(req.body.tagID, req.body.postFlag)
    posts
      ? res.json(posts)
      : res.sendStatus(400)
  })

  // @TODO tag exists ? add tag : make new tag

  /**
   * @api {post} /post/new-tag              Add new tag to post
   * @apiName AddNewTagToPost
   * @apiGroup Post
   *
   * @apiParam {number} postID
   * @apiParam {string} tagName
   *
   * @apiSuccess (204) {}                   Success
   * @apiError (400) {}                     Incorrect params || tagName already exists || insert failed
   */
  router.post('/new-tag', async (req, res) => {
    const result = await PostController.addPostTagWithNewTag(req.body.postID, req.body.tagName)
    result
      ? res.sendStatus(204)
      : res.sendStatus(400)
  })

  /**
   * @api {post} /post/tag                  Add tag to post
   * @apiName AddTagToPost
   * @apiGroup Post
   *
   * @apiParam {number} postID
   * @apiParam {string} tagName
   *
   * @apiSuccess (204) {}                   Success
   * @apiError (400) {}                     Incorrect params || tagName already exists || insert failed
   */
  router.post('/tag', async (req, res) => {
    const result = await PostController.addPostTagWithTagID(req.body.postID, req.body.tagID)
    result
      ? res.sendStatus(204)
      : res.sendStatus(400)
  })

  return router
}
