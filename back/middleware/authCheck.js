export default authCheck

function authCheck (req, res, next) {
  if (!req.user) res.redirect('/')
  else next()
}
