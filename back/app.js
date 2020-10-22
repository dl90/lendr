import path from 'path'
import express from 'express'
import cookieParser from 'cookie-parser'
import passport from 'passport'
import cookieSession from 'cookie-session'
import dotenv from 'dotenv'

import auth from './routes/auth.js'
import me from './routes/me.js'

dotenv.config()
const { json, urlencoded } = express
const app = express()

app.use(json())
app.use(urlencoded({ extended: true }))
app.use(cookieParser()) // ('', { httpOnly: true, sameSite: true, secure: true })
app.use(cookieSession({
  maxAge: 43200000, // 12h
  keys: [process.env.COOKIE_SESSION_SECRET_1, process.env.COOKIE_SESSION_SECRET_2]
  // sameSite: true,
  // httpOnly: true,
  // secure: true
}))
app.use(passport.initialize())
app.use(passport.session())
// app.use(express.static('public'))

export default function () {
  /* ------ homepage ------ */
  app.get('/', (req, res) => {
    if (req.user) res.redirect('/me')
    else res.sendFile(path.join(path.resolve(), '/public/index.html'))
  })

  /* ------ auth route ------ */
  app.use('/auth', auth())

  /* ------ private route ------ */
  app.use('/me', me())

  return app
}
