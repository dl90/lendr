import express from 'express'
import passport from '../middleware/passport.js'

const router = express.Router()

export default function () {
  /**
   * @api {post} /auth/sign-up                Sign-up new user
   * @apiName PostSign-up
   * @apiGroup Auth
   *
   * @apiParam {string} email                 User email
   * @apiParam {string} password              User password
   * @apiParam {string} [displayName = '']    User display name
   *
   * @apiSuccess (200) {string}               Redirect
   * @apiError (401) {text}                   400/Email already exists
   */
  router.post('/sign-up', passport.authenticate('local-signup'), (_req, res) => res.redirect('/me'))

  /**
   * @api {post} /auth/login                  Authenticate user
   * @apiName PostLogin
   * @apiGroup Auth
   *
   * @apiParam {string} email                 User email
   * @apiParam {string} password              User password
   *
   * @apiSuccess (200) {text}                 Redirect
   * @apiError (401) {text}                   401/Unauthorized
   */
  router.post('/login', passport.authenticate('local-login'), (_req, res) => res.redirect('/me'))

  /**
   * @api {get} /auth/logout                  Logout user
   * @apiName PostLogin
   * @apiGroup Auth
   *
   * @apiSuccess (200) {text}                 Redirect
   */
  router.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/')
  })

  /**
   * @api {get} /auth/github                  GitHub OAuth signup/login
   * @apiName PostLoginGitHub
   * @apiGroup Auth
   *
   * @apiSuccess (200) {text}                 Redirect
   */
  router.get('/github', passport.authenticate('github', { scope: ['profile'] }))

  /**
   * @api {get} /auth/redirect                  Redirect following GitHub OAuth
   * @apiName GetLoginGitHubRedirect
   * @apiGroup Auth
   *
   * @apiSuccess (200) {text}                   Redirect
   */
  router.get('/github/redirect', passport.authenticate('github'), (_req, res) => {
    res.redirect('/me')
  })

  return router
}
