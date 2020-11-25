import express from 'express'
// import JWTController from '../controller/JWTController.js'
import passport from '../middleware/passport.js'

const router = express.Router()

export default function () {
  /**
   * @api {post} /auth/sign-up              Sign-up new user
   * @apiName PostSign-up
   * @apiGroup Auth
   *
   * @apiParam {string} email
   * @apiParam {string} password
   * @apiParam {string} [displayName = '']
   *
   * @apiSuccess (200) {}
   * @apiError (401) {}                     400/Email already exists
   */
  router.post('/sign-up', passport.authenticate('local-signup'), (req, res) => res.json(req.user))

  /**
   * @api {post} /auth/login                Authenticate user
   * @apiName PostLogin
   * @apiGroup Auth
   *
   * @apiParam {string} email
   * @apiParam {string} password
   *
   * @apiSuccess (200) {}
   * @apiError (401) {}                     401/Unauthorized
   */
  router.post('/login', passport.authenticate('local-login'), (req, res) => res.json(req.user))
  // const payload = { id: req.user.id, displayName: req.user.display_name }
  // const token = JWTController.generate(payload)
  // res.cookie('access_token', 'Bearer ' + token, {
  //   expires: new Date(Date.now() + 12 * 3600000)
  // })
  // res.json(req.user)
  // })

  /**
   * @api {post} /auth/logout                Logout user
   * @apiName PostLogout
   * @apiGroup Auth
   *
   * @apiSuccess (200) {}
   */
  router.post('/logout', (req, res) => {
    req.logout()
    res.redirect('/')
  })

  /**
   * @api {get} /auth/github                GitHub OAuth signup/login
   * @apiName GetLoginGitHub
   * @apiGroup Auth
   *
   * @apiSuccess (200) {}                   Redirect
   */
  router.get('/github', passport.authenticate('github', { scope: ['profile'] }))

  /**
   * @api {get} /auth/redirect              Redirect following GitHub OAuth
   * @apiName GetLoginGitHubRedirect
   * @apiGroup Auth
   *
   * @apiSuccess (200) {}
   */
  router.get('/github/redirect', passport.authenticate('github'), (req, res) => res.json(req.user))

  return router
}
