import passport from 'passport'
// import LocalStrategy from 'passport-local'
import GitHubStrategy from 'passport-github2'
import UserController from '../controller/userController.js'
import dotenv from 'dotenv'
dotenv.config()

passport.serializeUser((user, done) => {
  done(null, user)
})

passport.deserializeUser(async (user, done) => {
  done(null, await UserController.getUserByID(user.id))
})

// const localLogin = new LocalStrategy({
//   usernameField: 'email',
//   passwordField: 'password'
// }, (email, password, done) => {

// })

/*
  profile {
    id: '****',
    displayName: 'Don L',
    _json: {
      id: ****,
      avatar_url: 'https://avatars1.githubusercontent.com/u/48544754?v=4',
      name: 'Don L',
      email: 'dl90dev@gmail.com',
    }
  }
*/
const githubLogin = new GitHubStrategy({
  clientID: process.env.GH_OAUTH_ID,
  clientSecret: process.env.GH_OAUTH_SECRET,
  callbackURL: process.env.GH_OAUTH_CB_URL
}, async (_accessToken, _refreshToken, profile, done) => {
  const { email, id, name } = profile._json
  const avatarURL = profile._json.avatar_url

  // @TODO if oauth entry is deleted, handel recreating oauth entry with existing user
  const existingUser = await UserController.verifyGitHubOauth(email, id.toString())
  !existingUser
    ? done(null, await UserController.signUpWithOAuth(email, parseInt(id), name, avatarURL))
    : done(null, existingUser)
})

export default passport.use(githubLogin)
