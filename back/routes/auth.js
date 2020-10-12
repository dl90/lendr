import express from 'express'
import argon2 from 'argon2'
import passport from '../middleware/passport.js'

const router = express.Router()
export default function (db) {
  /* ------ sign-up ------ */
  router.post('/sign-up', (req, res) => {
    const { email, password } = req.body

    async function addEntry () {
      const hash = await argon2.hash(password)
      const fields = { email, password: hash }
      db.createUser((err, result, fields) => {
        if (err) throw err
        if (result) res.send(result)
      }, fields)
    }

    try {
      db.getUsername((err, result, fields) => {
        if (err) throw err
        if (result && result[0]?.email === email) res.send('username already taken')
        else addEntry()
      }, email)
    } catch (err) {
      if (err) console.log(err)
    }
  })

  /* ------ login ------ */
  router.post('/login', (req, res) => {
    const { email, password } = req.body

    function verify () {
      db.getPassword(async (err, result, fields) => {
        if (err) throw err
        if (await argon2.verify(result[0]?.password, password)) res.send('logged in')
        else res.send('incorrect information')
      }, email)
    }

    try {
      db.getUsername((err, result, fields) => {
        if (err) throw err
        if (result && result[0]?.username !== email) res.send('incorrect information')
        else verify()
      }, email)
    } catch (err) {
      if (err) console.log(err)
    }
  })

  router.get('/logout', (req, res) => {
    // passport
  })

  router.get('/github', passport.authenticate('github', { scope: ['profile'] }))

  router.get('/github/redirect', passport.authenticate('github'), (req, res) => {
    res.send('success')
  })

  return router
}
