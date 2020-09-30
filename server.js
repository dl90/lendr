import app from './app.js'
import db from './db/db.js'

db.connect(err => { if (err) console.log(err) })
app(db).listen(8000, () => console.log(`Example app listening at http://localhost:${8000}`))
