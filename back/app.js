import path from 'path'
import express from 'express'
import cookieParser from 'cookie-parser'
import passport from 'passport'
import cookieSession from 'cookie-session'
import dotenv from 'dotenv'

import authRoute from './routes/authRoute.js'
import meRoute from './routes/meRoute.js'
import imageRoute from './routes/imageRoute.js'
import userRoute from './routes/userRoute.js'
import itemRoute from './routes/itemRoute.js'

dotenv.config()
const { json, urlencoded } = express
const app = express()

app.use(json())
app.use(urlencoded({ extended: true }))
app.use(cookieParser())
app.use(cookieSession({
  maxAge: 43200000, // 12h
  keys: [process.env.COOKIE_SESSION_SECRET_1, process.env.COOKIE_SESSION_SECRET_2],
  sameSite: true,
  httpOnly: true
  // secure: true
}))
app.use(passport.initialize())
app.use(passport.session())
// app.use(express.static('public'))

export default function () {
  /* ------ homepage ------ */
  app.get('/', (req, res) => {
    // if (req.user) res.redirect('/me')
    // else res.sendFile(path.join(path.resolve(), '/public/index.html'))
    res.sendFile(path.join(path.resolve(), '/public/index.html'))
  })

  /* ------ auth route ------ */
  app.use('/auth', authRoute())

  /* ------ private routes ------ */
  app.use('/me', meRoute())
  app.use('/image', imageRoute())
  app.use('/user', userRoute())
  app.use('/item', itemRoute())

  return app
}
