import express from 'express'
import authCheck from '../middleware/authCheck.js'

const router = express.Router()
router.use(authCheck)

export default function () {
  /**
   * @api {get} /me/                        Profile
   * @apiName GetMe
   * @apiGroup Me
   *
   * @apiSuccess (200) {json}               User profile JSON
   */
  router.get('/', (req, res) => {
    res.send('logged in as: \n' + JSON.stringify(req.user))
  })

  return router
}
