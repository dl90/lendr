import app from './src/app.js'
import db from './src/db/mysql.connect.js'
import dotenv from 'dotenv'
dotenv.config()

const PORT = process.env.PORT
db.connect(serve)

function serve (error) {
  if (error) throw new Error(error.message)
  console.log('Connected to DB')
  app().listen(PORT, () => console.log(`Live @ http://localhost:${PORT}`))
}
