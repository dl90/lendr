import express from 'express'
import pw from '../controller/pw.js'
import User from '../model/User.js'
import passport from '../middleware/passport.js'

const router = express.Router()
export default function (db) {
  /* ------ sign-up ------ */
  router.post('/sign-up', async (req, res) => {
    const { email, password, displayName } = req.body

    async function addEntry () {
      const hash = await pw.hash(password)
      const fields = { email, displayName, pwHash: hash }
      return await User.createUser(fields)
    }

    try {
      const check = await User.checkEmail(email)
      if (check) res.send('email already exists')
      else {
        const result = await addEntry()
        // passport/session/jwt
        if (result) res.send(result)
      }
    } catch (err) {
      if (err) console.log(err)
    }
  })

  /* ------ login ------ */
  router.post('/login', async (req, res) => {
    const { email, password } = req.body

    async function verify () {
      const hash = await User.getPasswordHash(email)
      return await pw.verify(hash, password)
    }

    try {
      const check = await User.checkEmail(email)
      if (!check) res.send('incorrect information')
      const result = await verify()
      // passport/session/jwt
      if (result) res.send('logged in')
    } catch (err) {
      if (err) console.log(err)
    }
  })

  router.get('/user', async (req, res) => {
    try {
      // hardcoded
      const result = await User.getUser(1)
      res.send(result)
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
