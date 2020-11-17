import fs from 'fs'
import http from 'http'
import https from 'https'
import path from 'path'

import app from './src/app.js'
import db from './src/db/mysql.connect.js'
import dotenv from 'dotenv'
dotenv.config()

const PORT = process.env.PORT
const key = fs.readFileSync(path.join(path.resolve(), '../https/localhost.key'))
const cert = fs.readFileSync(path.join(path.resolve(), '../https/localhost.crt'))
db.connect(serve)

function serve (error, conn) {
  if (error) throw new Error(error.message)
  console.log('Connected to DB')
  conn.release()

  app().listen(PORT, () => console.log(`Live @ https://localhost:${PORT}`))

  // const httpsServer = https.createServer({ key: key, cert: cert }, app())
  // httpsServer.listen(8443, () => console.log('Live @ https://localhost:8443'))

  // const httpServer = http.createServer(app())
  // httpServer.listen(PORT, () => console.log(`Live @ https://localhost:${PORT}`))
}
