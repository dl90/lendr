import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()
const SECRET = process.env.TOKEN_SECRET
const ISSUER = process.env.TOKEN_ISSUER

function generate (payload) {
  return jwt.sign(payload, SECRET, { issuer: ISSUER, expiresIn: '12h' })
}

function verify (token) {
  jwt.verify(token, SECRET, { issuer: ISSUER }, (err, decoded) => {
    return err ?? decoded
  })
}

export default { generate, verify }
