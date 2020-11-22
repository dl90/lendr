import express from 'express'
import helmet from 'helmet'
import passport from 'passport'
import cookieParser from 'cookie-parser'
import cookieSession from 'cookie-session'
import rateLimit from 'express-rate-limit'
import expressWs from 'express-ws'
import cors from 'cors'
import dotenv from 'dotenv'
import Filter from 'bad-words'

import authRoute from './routes/authRoute.js'
import meRoute from './routes/meRoute.js'
import imageRoute from './routes/imageRoute.js'
import userRoute from './routes/userRoute.js'
import itemRoute from './routes/itemRoute.js'
import postRoute from './routes/postRoute.js'
import tagRoute from './routes/tagRoute.js'
import msgRoute from './routes/msgRoute.js'

dotenv.config()

const { json, urlencoded } = express
const app = express()
const wsInstance = expressWs(app)
const authLimit = rateLimit({ windowMs: 3_600_000, max: 100 }) //         1h
const imageUploadLimit = rateLimit({ windowMs: 3_600_000, max: 48 }) //   1h
const generalLimit = rateLimit({ windowMs: 300_000, max: 500 }) //        5min
const filter = new Filter()

app.use(json())
app.use(cors({
  credentials: true,
  origin: ['https://localhost:3000', 'https://www.lendr-bc.me'],
  allowedHeaders: ['crossdomain', 'Content-Type', 'Authorization', 'Accept', 'X-Requested-With', 'Origin']
}))
app.options('*', cors({ allowedHeaders: ['crossdomain'] }))
app.use(urlencoded({ extended: true }))
app.use(cookieParser())
app.use(cookieSession({
  name: 'sessionId',
  maxAge: 43_200_000, // 12h
  keys: [process.env.COOKIE_SESSION_SECRET_1, process.env.COOKIE_SESSION_SECRET_2],
  domain: '',
  SameSite: 'none',
  httpOnly: true,
  secure: true
}))
app.use(helmet({ hsts: false, contentSecurityPolicy: false }))
app.use(passport.initialize())
app.use(passport.session())
app.use(generalLimit)
app.use(express.static('public'))

export default function () {
  /* ------ auth route ------ */
  app.use('/auth', authLimit, authRoute())

  /* ------ private routes ------ */
  app.use('/me', meRoute())
  app.use('/image', imageUploadLimit, imageRoute())
  app.use('/user', userRoute(filter))
  app.use('/item', itemRoute(filter))
  app.use('/post', postRoute(filter))
  app.use('/tag', tagRoute(filter))
  app.use('/msg', msgRoute(wsInstance, filter))

  app.use('*', (_req, res) => res.sendStatus(404))
  return app
}
