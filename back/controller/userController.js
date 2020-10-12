import argon2 from 'argon2'
import User from '../model/User.js'

/**
 * Verifies login credentials against db
 * @param {string} email
 * @param {string} password
 * @returns {boolean} true if valid
 */
async function login (email, password) {
  const check = await User.checkEmail(email)
  if (!check) return false
  else {
    const hash = await User.getPasswordHash(email)
    return await argon2.verify(hash, password)
  }
}

/**
 * Creates and adds ues user to db
 * @param {string} email
 * @param {string} password
 * @param {string|undefined} displayName
 * @returns {boolean|object} false if email exists | object if success
 */
async function signUp (email, password, displayName = null) {
  const check = await User.checkEmail(email)
  if (check) return false
  else {
    const hash = await argon2.hash(password)
    const fields = { email, displayName, pwHash: hash }
    return await User.createUser(fields)
  }
}

/**
 * Gets all user fields from db by user id
 * @param {string|number} id user id
 * @returns {object|null} user fields if user exists
 */
async function getUserByID (id) {
  const info = await User.getUserByID(id)
  return info ?? null
}

/**
 * Gets all user fields from db by user email
 * @param {string} email
 * @returns {object|null} user fields if user exists
 */
async function getUserByEmail (email) {
  const info = await User.getUserByEmail(email)
  return info ?? null
}

export default { login, signUp, getUserByID, getUserByEmail }
