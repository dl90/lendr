import express from 'express'
import authCheck from '../middleware/authCheck.js'

const router = express.Router()
export default function () {
  router.get('/', authCheck, (req, res) => {
    res.send('logged in as: \n' + JSON.stringify(req.user))
  })

  return router
}
