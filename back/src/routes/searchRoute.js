import express from 'express'
import authCheck from '../middleware/authCheck.js'
import ElasticController from '../controller/ElasticController.js'

const router = express.Router()
router.use(authCheck)

export default function () {
  router.post('/query', async (req, res) => {
    const results = await ElasticController.search(req.body.title)
    const ans = results.map(x => x._source)
    results
      ? res.json(ans)
      : res.sendStatus(400)
  })

  return router
}
