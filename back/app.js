import express from 'express'
import cookieParser from 'cookie-parser'
import auth from './routes/auth.js'

const app = express()
const { json, urlencoded } = express

app.use(json())
app.use(urlencoded({ extended: false }))
app.use(cookieParser()) // ('', { httpOnly: true, sameSite: true, secure: true })
app.use(express.static('public'))

export default function (db) {
  /* ------ auth route ------ */
  app.use('/auth', auth(db))

  return app
}
