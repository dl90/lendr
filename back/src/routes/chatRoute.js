import express from 'express'

const router = express.Router()

export default function () {
  router.ws('/echo', (ws, req) => {
    ws.on('message', msg => ws.send(msg))
  })

  return router
}
