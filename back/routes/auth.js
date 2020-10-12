import express from 'express'
import userController from '../controller/userController.js'
import passport from '../middleware/passport.js'

const router = express.Router()
export default function () {
  /**
   * @api {post} /auth/sign-up                                Sign-up new user
   * @apiName PostSign-up
   * @apiGroup Auth
   *
   * @apiParam {string} email                                 User email
   * @apiParam {string} password                              User password
   * @apiParam {string} [displayName = '']                    User display name
   *
   * @apiSuccess (201) {string}                               User creation data
   * @apiHeader (Response Headers) {string} authorization     Authorization Bearer token
   * @apiError (400) {text}                                   400/Email already exists
   * @apiError (500) {text}                                   500/Internal server error
   */
  router.post('/sign-up', async (req, res) => {
    const { email, password, displayName } = req.body
    try {
      const success = userController.signUp(email, password, displayName)
      // @TODO passport authorize
      success ? res.status(201).json(success) : res.status(400).json({ Message: 'Email already exists' })
    } catch (err) {
      // @TODO log error
      if (err) console.log(err)
      res.status(500).json({ Error: 'Something went wrong' })
    }
  })

  /**
   * @api {post} /auth/login                                  Authenticate user
   * @apiName PostLogin
   * @apiGroup Auth
   *
   * @apiParam {string} email                                 User email
   * @apiParam {string} password                              User password
   *
   * @apiSuccess (200) {text}                                 Redirect
   * @apiHeader (Response Headers) {string} authorization     Authorization Bearer token
   * @apiError (401) {text}                                   401/Unauthorized
   * @apiError (500) {text}                                   500/Internal server error
   */
  router.post('/login', async (req, res) => {
    const { email, password } = req.body
    try {
      const success = userController.login(email, password)
      // @TODO passport authorize
      success ? res.status(200).json({ Message: 'Logged in' }) : res.status(401).json({ Message: 'Incorrect information' })
    } catch (error) {
      // @TODO log error
      console.log(error)
      res.status(500).json({ Error: 'Something went wrong' })
    }
  })

  router.get('/logout', (req, res) => {
    // passport
  })

  router.get('/github', passport.authenticate('github', { scope: ['profile'] }))

  router.get('/github/redirect', passport.authenticate('github'), (req, res) => {
    res.send('success')
  })

  /**
   * @TODO move to user route
   *
   * @api {post} /auth//get-user                              Get user data
   * @apiName PostGetUser
   * @apiGroup Auth
   *
   * @apiParam {string|number} [id]                           User id
   * @apiParam {string} email                                 User email
   *
   * @apiSuccess (200) {json}                                 User information
   * @apiHeader (Request Headers) {string} authorization      Authorization Bearer token
   * @apiError (401) {text}                                   401/Unauthorized
   * @apiError (500) {text}                                   500/Internal server error
   */
  router.post('/get-user', async (req, res) => {
    const { id, email } = req.body
    try {
      if (id) {
        const result = await userController.getUserByID(id)
        result ? res.status(200).json(result) : res.status(400).json({ Message: 'Incorrect id' })
      } else if (email) {
        const result = await userController.getUserByEmail(email)
        result ? res.status(200).json(result) : res.status(400).json({ Message: 'Incorrect email' })
      } else {
        res.status(400).json({ Message: 'Missing params' })
      }
    } catch (error) {
      // @TODO log error
      console.log(error)
      res.status(500).json({ Error: 'Something went wrong' })
    }
  })

  return router
}
