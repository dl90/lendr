import path from 'path'
import express from 'express'
import cookieParser from 'cookie-parser'
import passport from 'passport'
import cookieSession from 'cookie-session'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import dotenv from 'dotenv'

import authRoute from './routes/authRoute.js'
import meRoute from './routes/meRoute.js'
import imageRoute from './routes/imageRoute.js'
import userRoute from './routes/userRoute.js'
import itemRoute from './routes/itemRoute.js'
import postRoute from './routes/postRoute.js'
import tagRoute from './routes/tagRoute.js'

dotenv.config()
const { json, urlencoded } = express
const app = express()

app.use(json())
app.use(urlencoded({ extended: true }))
app.use(cookieParser())
app.use(cookieSession({
  maxAge: 43_200_000, // 12h
  keys: [process.env.COOKIE_SESSION_SECRET_1, process.env.COOKIE_SESSION_SECRET_2],
  sameSite: true,
  httpOnly: true
  // secure: true
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(helmet())
// app.use(express.static('public'))

const authLimit = rateLimit({ windowMs: 3_600_000, max: 10 }) // 1h
const imageUploadLimit = rateLimit({ windowMs: 3_600_000, max: 36 }) // 1h
const generalLimit = rateLimit({ windowMs: 300_000, max: 100 }) // 5min
app.use(generalLimit)

export default function () {
  /* ------ homepage ------ */
  app.get('/', (req, res) => {
    // if (req.user) res.redirect('/me')
    // else res.sendFile(path.join(path.resolve(), '/public/index.html'))
    res.sendFile(path.join(path.resolve(), '/public/index.html'))
  })

  /* ------ auth route ------ */
  app.use('/auth', authLimit, authRoute())

  /* ------ private routes ------ */
  app.use('/me', meRoute())
  app.use('/image', imageUploadLimit, imageRoute())
  app.use('/user', userRoute())
  app.use('/item', itemRoute())
  app.use('/post', postRoute())
  app.use('/tag', tagRoute())

  return app
}
