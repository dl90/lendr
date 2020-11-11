import express from 'express'
import UserController from '../controller/UserController.js'
import authCheck from '../middleware/authCheck.js'
import multer from '../middleware/multer.js'

const router = express.Router()
router.use(authCheck)

export default function () {
  /**
   * @api {post} /user/get                  Get user profile
   * @apiName PostGetUserProfile
   * @apiGroup User
   *
   * @apiParam {number} userID
   *
   * @apiSuccess (200) {json}               User profile
   * @apiError (400) {}                     User does not exist
   */
  router.post('/get', async (req, res) => {
    const queryUser = await UserController.getUserByID(req.body.userID)
    queryUser
      ? res.json(queryUser)
      : res.sendStatus(400)
  })

  /**
   * @api {post} /user/get-all              Get all user profiles
   * @apiName PostGetUserProfile
   * @apiGroup User
   *
   * @apiParam {boolean|undefined} active
   * @apiParam {boolean|undefined} reportFlag
   *
   * @apiSuccess (200) {json}               Users profile
   * @apiError (400) {}                     User does not exist
   */
  router.post('/get-all', async (req, res) => {
    const users = await UserController.getAllUsers(req.body.active, req.body.reportFlag)
    users
      ? res.json(users)
      : res.sendStatus(400)
  })

  /**
   * @api {put} /user/change-pw             Update user password
   * @apiName PutUpdateUserPassword
   * @apiGroup User
   *
   * @apiParam {string} password
   *
   * @apiSuccess (204) {}                   Success
   * @apiError (400) {}                     Failed
   */
  router.put('/change-pw', async (req, res) => {
    const { password } = req.body
    await UserController.updatePassword(req.user.id, password)
      ? res.sendStatus(204)
      : res.sendStatus(400)
  })

  /**
   * @api {put} /user/change-display-name   Update user display name
   * @apiName PutUpdateUserDisplayName
   * @apiGroup User
   *
   * @apiParam {string} displayName
   *
   * @apiSuccess (204) {}                   Success
   * @apiError (400) {}                     Failed
   */
  router.put('/change-display-name', authCheck, async (req, res) => {
    await UserController.updateDisplayName(req.user.id, req.body.displayName)
      ? res.sendStatus(204)
      : res.sendStatus(400)
  })

  /**
   * @TODO delete previous avatar from s3
   *
   * @api {post} /user/change-avatar        Uploads image to s3 and update user avatar url in db
   * @apiName PostImageSingle
   * @apiGroup User
   *
   * @apiParam {file} avatar                Image file [jpeg|jpg|png|gif]
   *
   * @apiSuccess (204) {}                   Success
   * @apiError (400) {}                     Incorrect filetype or failed to save to db
   */
  router.post('/change-avatar', multer.single('avatar'), async (req, res) => {
    if (!req.file) res.sendStatus(400)
    else {
      const avatarUpdated = await UserController.updateAvatar(req.user.id, req.file.location)
      avatarUpdated
        ? res.sendStatus(204)
        : res.sendStatus(400)
    }
  })

  /**
   * @api {delete} /user/delete             Delete and logout current user
   * @apiName DeleteUser
   * @apiGroup User
   *
   * @apiSuccess (200) {}                   Redirect
   * @apiError (400) {}                     Failed
   */
  router.delete('/delete', async (req, res) => {
    const status = await UserController.deleteUser(req.user.id)
    if (status) {
      req.logout()
      res.redirect('/')
    } else res.sendStatus(400)
  })

  /**
   * @api {post} /user/report               Report a user
   * @apiName PostReportUser
   * @apiGroup User
   *
   * @apiParam {number} userID
   *
   * @apiSuccess (204) {}                   Success
   * @apiError (400) {}                     Failed
   */
  router.post('/report', async (req, res) => {
    await UserController.updateReportFlag(req.body.userID, true)
      ? res.sendStatus(204)
      : res.sendStatus(400)
  })

  /*
    @TODO
      set user active when they post/message within 14 days
      otherwise user is inactive regardless of login
  */

  return router
}
