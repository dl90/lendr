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

  // @TODO only delete/modify your own posts

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

  /**
   * @api {post} /post/get-tag-name         Get all posts by tagName
   * @apiName GetAllPostWithTagName
   * @apiGroup Post
   *
   * @apiParam {string} tagName
   *
   * @apiSuccess (200) {json}               Posts
   * @apiError (400) {}                     Incorrect tagName || get failed
   */
  router.post('/get-tag-name', async (req, res) => {
    const posts = await PostController.getAllPostsByTagName(req.body.tagName, req.body.postFlag)
    posts
      ? res.json(posts)
      : res.sendStatus(400)
  })

  /**
   * @api {put} /post/tag                  Add tag to post
   * @apiName AddTagToPost
   * @apiGroup Post
   *
   * @apiParam {number} postID
   * @apiParam {string} tagName
   *
   * @apiSuccess (204) {}                   Success
   * @apiError (400) {}                     Incorrect params || insert failed
   */
  router.put('/tag', async (req, res) => {
    await PostController.addPostTagWithNewTag(req.body.postID, req.body.tagName)
      ? res.sendStatus(204)
      : res.sendStatus(400)
  })

  /**
   * @api {patch} /post/title               Update post title
   * @apiName UpdatePostTitle
   * @apiGroup Post
   *
   * @apiParam {number} postID
   * @apiParam {string} postTitle
   *
   * @apiSuccess (204) {}                   Success
   * @apiError (400) {}                     Incorrect params || update failed
   */
  router.patch('/title', async (req, res) => {
    await PostController.updatePostTitle(req.body.postID, req.body.postTitle)
      ? res.sendStatus(204)
      : res.sendStatus(400)
  })

  /**
   * @api {patch} /post/rate                Update post rate
   * @apiName UpdatePostRate
   * @apiGroup Post
   *
   * @apiParam {number} postID
   * @apiParam {number} postRate
   *
   * @apiSuccess (204) {}                   Success
   * @apiError (400) {}                     Incorrect params || update failed
   */
  router.patch('/rate', async (req, res) => {
    await PostController.updatePostRate(req.body.postID, req.body.postRate)
      ? res.sendStatus(204)
      : res.sendStatus(400)
  })

  /**
   * @api {patch} /post/description         Update post description
   * @apiName UpdatePostDescription
   * @apiGroup Post
   *
   * @apiParam {number} postID
   * @apiParam {string} postDescription
   *
   * @apiSuccess (204) {}                   Success
   * @apiError (400) {}                     Incorrect params || update failed
   */
  router.patch('/description', async (req, res) => {
    await PostController.updatePostDescription(req.body.postID, req.body.postDescription)
      ? res.sendStatus(204)
      : res.sendStatus(400)
  })

  /**
   * @api {patch} /post/location            Update post location
   * @apiName UpdatePostLocation
   * @apiGroup Post
   *
   * @apiParam {number} postID
   * @apiParam {string} postLocation
   *
   * @apiSuccess (204) {}                   Success
   * @apiError (400) {}                     Incorrect params || update failed
   */
  router.patch('/location', async (req, res) => {
    await PostController.updatePostLocation(req.body.postID, req.body.postLocation)
      ? res.sendStatus(204)
      : res.sendStatus(400)
  })

  /**
   * @api {patch} /post/duration            Update post duration
   * @apiName UpdatePostDuration
   * @apiGroup Post
   *
   * @apiParam {number} postID
   * @apiParam {string} postDuration
   *
   * @apiSuccess (204) {}                   Success
   * @apiError (400) {}                     Incorrect params || update failed
   */
  router.patch('/duration', async (req, res) => {
    await PostController.updatePostDuration(req.body.postID, req.body.postDuration)
      ? res.sendStatus(204)
      : res.sendStatus(400)
  })

  /**
   * @api {patch} /post/flag                Update post flag
   * @apiName UpdatePostFlag
   * @apiGroup Post
   *
   * @apiParam {number} postID
   * @apiParam {boolean} postFlag
   *
   * @apiSuccess (204) {}                   Success
   * @apiError (400) {}                     Incorrect params || update failed
   */
  router.patch('/flag', async (req, res) => {
    await PostController.setPostReportFlag(req.body.postID, req.body.postFlag)
      ? res.sendStatus(204)
      : res.sendStatus(400)
  })

  return router
}
