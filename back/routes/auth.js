import express from 'express'
import argon2 from 'argon2'

const router = express.Router()

export default function (db) {
  /* ------ sign-up ------ */
  router.post('/sign-up', (req, res) => {
    const { username, password } = req.body

    async function addEntry () {
      const hash = await argon2.hash(password)
      db.createUser((err, result, fields) => {
        if (err) throw err
        if (result) res.send(result)
      }, username, hash)
    }

    try {
      db.getUsername((err, result, fields) => {
        if (err) throw err
        if (result && result[0]?.username === username) res.send('username already taken')
        else addEntry()
      }, username)
    } catch (err) {
      if (err) console.log(err)
    }
  })

  /* ------ login ------ */
  router.post('/login', (req, res) => {
    const { username, password } = req.body

    function verify () {
      db.getPassword(async (err, result, fields) => {
        if (err) throw err
        if (await argon2.verify(result[0]?.password, password)) res.send('logged in')
        else res.send('incorrect information')
      }, username)
    }

    try {
      db.getUsername((err, result, fields) => {
        if (err) throw err
        if (result && result[0]?.username !== username) res.send('incorrect information')
        else verify()
      }, username)
    } catch (err) {
      if (err) console.log(err)
    }
  })

  return router
}
