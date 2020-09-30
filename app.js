import express from 'express'
import auth from './routes/auth.js'

const app = express()
const { json, urlencoded } = express

app.use(json())
app.use(urlencoded({ extended: true }))
app.use(express.static('public'))

export default function (db) {
  /* ------ auth route ------ */
  app.use('/auth', auth(db))

  return app
}
