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
   * @apiParam {number} userID              User ID
   *
   * @apiSuccess (200) {json}               User profile JSON
   * @apiError (400) {}                     User does not exist
   */
  router.post('/get', async (req, res) => {
    const queryUser = await UserController.getUserByID(req.body.userID)
    queryUser
      ? res.json(queryUser)
      : res.sendStatus(400)
  })

  /**
   * @api {post} /user/change-pw            Update user password
   * @apiName PostUpdateUserPassword
   * @apiGroup User
   *
   * @apiParam {string} password            New password
   *
   * @apiSuccess (200) {}                   Success
   * @apiError (400) {}                     Failed
   */
  router.post('/change-pw', async (req, res) => {
    const { password } = req.body
    await UserController.updatePassword(req.user.id, password)
      ? res.sendStatus(200)
      : res.sendStatus(400)
  })

  /**
   * @api {post} /user/change-display-name  Updates user display name
   * @apiName PostUpdateUserDisplayName
   * @apiGroup User
   *
   * @apiParam {string} displayName         New display name
   *
   * @apiSuccess (200) {}                   Success
   * @apiError (400) {}                     Failed
   */
  router.post('/change-display-name', authCheck, async (req, res) => {
    const { displayName } = req.body
    await UserController.updateDisplayName(req.user.id, displayName)
      ? res.sendStatus(200)
      : res.sendStatus(400)
  })

  /**
   * @api {post} /user/change-avatar        Uploads image to s3 and update user avatar url in db
   * @apiName PostImageSingle
   * @apiGroup User
   *
   * @apiParam {file} avatar                Image file [jpeg|jpg|png|gif]
   *
   * @apiSuccess (200) {}                   Success
   * @apiError (400) {}                     Incorrect filetype or failed to save to db
   */
  router.post('/change-avatar', multer.single('avatar'), async (req, res) => {
    if (!req.file) res.sendStatus(400)
    else {
      const avatarUpdated = await UserController.updateAvatar(req.user.id, req.file.location)
      avatarUpdated
        ? res.sendStatus(200)
        : res.sendStatus(400)
    }
  })

  /**
   * @api {delete} /user/delete             Delete and logout current user
   * @apiName DeleteUser
   * @apiGroup User
   *
   * @apiSuccess (200) {}                   Success
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
   * @apiParam {number} userID              ID of user to report
   *
   * @apiSuccess (200) {}                   Success
   * @apiError (400) {}                     Failed
   */
  router.post('/report', async (req, res) => {
    const { userID } = req.body
    await UserController.updateReportFlag(userID, true)
      ? res.sendStatus(200)
      : res.sendStatus(400)
  })

  /*
    @TODO
      set user active when they post/message within 14 days
      otherwise user is inactive regardless of login
  */

  return router
}
