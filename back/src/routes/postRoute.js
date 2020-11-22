import express from 'express'
import config from '../util/config.js'
import PostController from '../controller/PostController.js'
import authCheck from '../middleware/authCheck.js'
import multer from '../middleware/multer.js'

const router = express.Router()
router.use(authCheck)

export default function (filter) {
  /**
   * @api {post} /post/new                  Create new post with existing item
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
  router.post('/new', async (req, res) => {
    const postID = await PostController.createPostWithItemID(
      req.user.id,

      req.body.itemID,
      req.body.postTitle,
      req.body.postRate,
      req.body.postDescription,
      req.body.postLocation,
      req.body.postDuration
    )

    postID
      ? res.json({ postID })
      : res.sendStatus(400)
  })

  /**
   * @api {post} /post/new-item             Create new post with new item
   * @apiName NewItemPost
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
  router.post('/new-item', async (req, res) => {
    const postID = await PostController.createPostWithNewItem(
      req.user.id,

      req.body.itemName,
      req.body.itemCondition,
      req.body.itemAge,
      req.body.postTitle,
      req.body.postRate,
      req.body.postDescription,
      req.body.postLocation,
      req.body.postDuration
    )

    postID
      ? res.json({ postID })
      : res.sendStatus(400)
  })

  /**
   * @api {post} /post/new-item-images      Create new post with new item and images
   * @apiName NewItemPostWithImages
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
   * @apiParam {files}  images
   *
   * @apiSuccess (200) {json}               Success
   * @apiError (400) {}                     Incorrect arguments || servier error
   */
  router.post('/new-complete', multer.array('images', config.BATCH_IMAGE_UPLOAD_COUNT), async (req, res) => {
    if (!req.files.length) res.sendStatus(400)
    else {
      const result = await PostController.createNewPostComplete(
        req.user.id,
        req.body.itemName,
        req.body.itemCondition,
        req.body.itemAge,
        req.body.postTitle,
        req.body.postRate,
        req.body.postDescription,
        req.body.postLocation,
        req.body.tag,
        req.files,
        req.body.postDuration
      )

      result
        ? res.json(result)
        : res.sendStatus(400)
    }
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
    await PostController.deletePost(req.user.id, req.body.postID)
      ? res.sendStatus(204)
      : res.sendStatus(400)
  })

  /**
   * @api {post} /post/get-id               Get post by postID
   * @apiName GetPostByPostID
   * @apiGroup Post
   *
   * @apiParam {number} postID
   *
   * @apiSuccess (200) {json}               Post
   * @apiError (400) {}                     Incorrect postID || get failed
   */
  router.post('/get-id', async (req, res) => {
    const post = await PostController.getPostByPostID(req.body.postID)
    post
      ? res.json(post)
      : res.sendStatus(400)
  })

  /**
   * @api {post} /post/get-all              Get all posts
   * @apiName GetAllPosts
   * @apiGroup Post
   *
   * @apiParam {number} idx                 starting idx
   * @apiParam {number} count               number of posts
   *
   * @apiSuccess (200) {json}               Posts
   * @apiError (400) {}                     Get failed
   */
  router.post('/get-all', async (req, res) => {
    const posts = await PostController.getAllPosts(req.body.idx, req.body.count)
    posts
      ? res.json(posts)
      : res.status(400)
  })

  /**
   * @api {post} /post/get-all-own          Get all users posts
   * @apiName GetAllPostsFromCurrentUser
   * @apiGroup Post
   *
   * @apiSuccess (200) {json}               Posts
   * @apiError (400) {}                     Get failed
   */
  router.post('/get-all-own', async (req, res) => {
    const posts = await PostController.getAllPostsByUserID(req.user.id)
    posts
      ? res.json(posts)
      : res.sendStatus(400)
  })

  /**
   * @api {post} /post/get-user-id          Get all posts by userID
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
   * @apiParam {boolean|undefined} postFlag
   *
   * @apiSuccess (200) {json}               Posts
   * @apiError (400) {}                     Incorrect itemID || get failed
   */
  router.post('/get-item-id', async (req, res) => {
    const posts = await PostController.getAllPostsByItemID(req.user.id, req.body.itemID, req.body.postFlag)
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
   * @apiParam {number} idx
   * @apiParam {number} count
   * @apiParam {boolean|undefined} postFlag
   *
   * @apiSuccess (200) {json}               Posts
   * @apiError (400) {}                     Incorrect tagID || get failed
   */
  router.post('/get-tag-id', async (req, res) => {
    const posts = await PostController.getAllPostsByTagID(req.body.tagID, req.body.idx, req.body.count, req.body.postFlag)
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
   * @apiParam {number} idx
   * @apiParam {number} count
   * @apiParam {boolean|undefined} postFlag
   *
   * @apiSuccess (200) {json}               Posts
   * @apiError (400) {}                     Incorrect tagName || get failed
   */
  router.post('/get-tag-name', async (req, res) => {
    const posts = await PostController.getAllPostsByTagName(req.body.tagName, req.body.idx, req.body.count, req.body.postFlag)
    posts
      ? res.json(posts)
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
   * @apiError (400) {}                     Incorrect params || insert failed
   */
  router.post('/tag', async (req, res) => {
    await PostController.addPostTagWithNewTag(req.user.id, req.body.postID, req.body.tagName)
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
    await PostController.updatePostTitle(req.user.id, req.body.postID, req.body.postTitle)
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
    await PostController.updatePostRate(req.user.id, req.body.postID, req.body.postRate)
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
    await PostController.updatePostDescription(req.user.id, req.body.postID, req.body.postDescription)
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
    await PostController.updatePostLocation(req.user.id, req.body.postID, req.body.postLocation)
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
    await PostController.updatePostDuration(req.user.id, req.body.postID, req.body.postDuration)
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

  /**
   * @api {post} /post/upload-images        Upload images to s3
   * @apiName UploadPostImages
   * @apiGroup Post
   *
   * @apiParam {number} postID
   * @apiParam {files} images               Image files, 12 max [jpeg|jpg|png|gif]
   *
   * @apiSuccess (204) {}                   Success
   * @apiError (400) {}                     Incorrect params || upload failed
   */
  router.post('/upload-images', multer.array('images', config.BATCH_IMAGE_UPLOAD_COUNT), async (req, res) => {
    if (!req.files.length) res.sendStatus(400)
    else {
      await PostController.addPostImages(req.user.id, req.body.postID, req.files)
        ? res.sendStatus(204)
        : res.sendStatus(400)
    }
  })

  /**
   * @api {post} /post/images               Get all post images by postID
   * @apiName GetPostImages
   * @apiGroup Post
   *
   * @apiParam {number} postID
   *
   * @apiSuccess (200) {json}               Post images
   * @apiError (400) {}                     Incorrect params || server error
   */
  router.post('/images', async (req, res) => {
    const result = await PostController.getAllPostImages(req.body.postID)
    result
      ? res.json(result)
      : res.sendStatus(400)
  })

  /**
   * @api {delete} /post/images             Delete postImage by postImageID
   * @apiName DeletePostImage
   * @apiGroup Post
   *
   * @apiParam {number} postImageID
   *
   * @apiSuccess (204) {}                   Success
   * @apiError (400) {}                     Incorrect params || server error
   */
  router.delete('/image', async (req, res) => {
    await PostController.deletePostImage(req.body.postImageID)
      ? res.sendStatus(204)
      : res.sendStatus(400)
  })

  return router
}
