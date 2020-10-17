import passport from 'passport'
import GitHubStrategy from 'passport-github2'
// import User from '../controller/userController.js'
import dotenv from 'dotenv'
dotenv.config()

/*
  {
    id: '****',
    nodeId: '****',
    displayName: 'Don L',
    username: 'dl90',
    profileUrl: 'https://github.com/dl90',
    emails: [ { value: 'dl90dev@gmail.com' } ],
    photos: [
      { value: 'https://avatars1.githubusercontent.com/u/48544754?v=4' }
    ],
    _json: {
      login: '****',
      id: ****,
      node_id: '****',
      avatar_url: 'https://avatars1.githubusercontent.com/u/48544754?v=4',
      gravatar_id: '',
      url: 'https://api.github.com/users/dl90',
      html_url: 'https://github.com/dl90',
      followers_url: 'https://api.github.com/users/dl90/followers',
      following_url: 'https://api.github.com/users/dl90/following{/other_user}',
      gists_url: 'https://api.github.com/users/dl90/gists{/gist_id}',
      starred_url: 'https://api.github.com/users/dl90/starred{/owner}{/repo}',
      subscriptions_url: 'https://api.github.com/users/dl90/subscriptions',
      organizations_url: 'https://api.github.com/users/dl90/orgs',
      repos_url: 'https://api.github.com/users/dl90/repos',
      events_url: 'https://api.github.com/users/dl90/events{/privacy}',
      received_events_url: 'https://api.github.com/users/dl90/received_events',
      type: 'User',
      site_admin: false,
      name: 'Don L',
      company: null,
      blog: '',
      location: 'Vancouver, Canada',
      email: 'dl90dev@gmail.com',
      hireable: true,
      bio: 'FSWD Student',
      twitter_username: null,
      public_repos: 15,
      public_gists: 0,
      followers: 6,
      following: 17,
      created_at: '2019-03-14T06:19:26Z',
      updated_at: '2020-10-12T00:42:27Z'
    }
  }
*/
const githubLogin = new GitHubStrategy({
  clientID: process.env.GH_OAUTH_ID,
  clientSecret: process.env.GH_OAUTH_SECRET,
  callbackURL: process.env.GH_OAUTH_CB_URL
}, (accessToken, refreshToken, profile, done) => {
  console.log(accessToken) // ****
  console.log(refreshToken) // undefined
  console.log(profile)
  console.log(done)
})

export default passport.use(githubLogin)
