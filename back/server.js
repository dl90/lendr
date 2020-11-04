import app from './app.js'
import db from './db/mysql.connect.js'
import dotenv from 'dotenv'
dotenv.config()

const PORT = process.env.PORT
db.connect(serve)

function serve (error) {
  if (error) console.log(error)
  else {
    console.log('Connected to DB')
    app().listen(PORT, () => console.log(`Live @ http://localhost:${PORT}`))
  }
}
