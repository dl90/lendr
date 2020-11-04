import express from 'express'
import authCheck from '../middleware/authCheck.js'
import UserController from '../controller/UserController.js'

const router = express.Router()
export default function () {
  router.post('/', authCheck, async (req, res) => {
    const { userID } = req.body
    const queryUser = await UserController.getUserByID(userID)
    if (queryUser) res.send(JSON.stringify(queryUser))
    else res.send('logged in as: \n' + JSON.stringify(req.user))
  })

  return router
}
