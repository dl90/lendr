import passport from 'passport'
import LocalStrategy from 'passport-local'
import GitHubStrategy from 'passport-github2'
import userController from '../controller/UserController.js'
import dotenv from 'dotenv'
dotenv.config()

export default passport

passport.serializeUser((user, done) => done(null, user))
passport.deserializeUser(async (user, done) => {
  done(null, await userController.getUserByID(user.id))
})

passport.use('local-login', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, async (email, password, done) => {
  const existingUser = await userController.login(email, password)
  !existingUser
    ? done(null, false, { message: 'Invalid email or password' })
    : done(null, existingUser)
}))

passport.use('local-signup', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, email, password, done) => {
  const { displayName } = req.body
  const newUser = await userController.signUpWithEmailPassword(email, password, displayName)
  !newUser
    ? done(null, false, { message: 'User already exists' })
    : done(null, newUser)
}))

passport.use('github', new GitHubStrategy({
  clientID: process.env.GH_OAUTH_ID,
  clientSecret: process.env.GH_OAUTH_SECRET,
  callbackURL: process.env.GH_OAUTH_CB_URL
}, async (_accessToken, _refreshToken, profile, done) => {
  const { email, id, name } = profile._json
  const avatarURL = profile._json.avatar_url

  // @TODO if oauth entry is deleted, handel recreating oauth entry with existing user
  const existingUser = await userController.verifyGitHubOauth(email, id.toString())
  !existingUser
    ? done(null, await userController.signUpWithOAuth(email, +id, name, avatarURL))
    : done(null, existingUser)
}))
