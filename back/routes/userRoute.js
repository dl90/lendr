import express from 'express'
import authCheck from '../middleware/authCheck.js'
import UserController from '../controller/UserController.js'
// import multer from '../middleware/multer.js'

const router = express.Router()
export default function () {
  /**
   * @api {post} /user/get                        Get user profile
   * @apiName PostGetUserProfile
   * @apiGroup User
   *
   * @apiParam {number} userID                User ID
   *
   * @apiSuccess (200) {json}                 User profile JSON
   * @apiError (400) {}                       User does not exist
   */
  router.post('/get', authCheck, async (req, res) => {
    const { userID } = req.body
    const queryUser = await UserController.getUserByID(userID)
    if (queryUser) res.status(200).json(queryUser)
    else res.status(204).end()
  })

  /**
   * @api {post} /user/change-pw              Update user password
   * @apiName PostUpdateUserPassword
   * @apiGroup User
   *
   * @apiParam {string} password              New password
   *
   * @apiSuccess (200) {}                     password change success
   * @apiError (400) {}                       password change failed
   */
  router.post('/change-pw', authCheck, async (req, res) => {
    const { password } = req.body
    await UserController.updatePassword(req.user.id, password)
      ? res.sendStatus(200) : res.sendStatus(400)
  })

  /*
    @TODO
      user upload avatar
      delete user
  */

  router.post('/inactive', authCheck, async (req, res) => {
    const inactive = await UserController.getAllInactiveUsers()
    inactive ? res.status(200).json(inactive) : res.sendStatus(400)
  })

  router.post('/report', authCheck, async (req, res) => {
    const query = await UserController.updateReportFlag(1, false)
    console.log(query)
  })

  return router
}
