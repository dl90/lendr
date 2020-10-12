import jwt from 'jsonwebtoken'
import { config } from 'dotenv'

config()
const SECRET = process.env.TOKEN_SECRET
const ISSUER = process.env.TOKEN_ISSUER

function generateToken (payload) {
  return jwt.sign(payload, SECRET, { issuer: ISSUER, expiresIn: '12h' })
}

function verifyToken (token) {
  jwt.verify(token, SECRET, { issuer: ISSUER }, (err, decoded) => {
    return err ?? decoded
  })
}

export default { generateToken, verifyToken }
