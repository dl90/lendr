import app from './app.js'
import db from './db/mysql.connect.js'
import dotenv from 'dotenv'
dotenv.config()

const PORT = process.env.PORT

db.connect(err => err ? console.log(err) : console.log('Connected to DB'))
app().listen(PORT, () => console.log(`Live @ http://localhost:${PORT}`))
