export default authCheck

function authCheck (req, res, next) {
  if (!req.isAuthenticated()) res.redirect('/')
  else next()
}
