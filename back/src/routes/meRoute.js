import express from 'express'
import authCheck from '../middleware/authCheck.js'

const router = express.Router()
router.use(authCheck)

export default function () {
  /**
   * @api {post} /me/                       Profile
   * @apiName GetProfile
   * @apiGroup Me
   *
   * @apiSuccess (200) {json}               User profile JSON
   */
  router.post('/', (req, res) => res.json(req.user))

  return router
}
