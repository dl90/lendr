import passport from 'passport'
import GitHubStrategy from 'passport-github2'
import dotenv from 'dotenv'
dotenv.config()

const githubLogin = new GitHubStrategy({
  clientID: process.env.GH_OAUTH_ID,
  clientSecret: process.env.GH_OAUTH_SECRET,
  callbackURL: process.env.GH_OAUTH_CB_URL
}, (accessToken, refreshToken, profile, done) => {
  console.log(accessToken)
  console.log(refreshToken)
  console.log(profile)
  return done
})

export default passport.use(githubLogin)
