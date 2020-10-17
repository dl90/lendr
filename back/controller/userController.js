import argon2 from 'argon2'
import User from '../model/UserModel.js'

export default {
  login,
  signUpWithEmailPassword,
  signUpWithOAuth,

  getUserByID,
  getUserByEmail
}

/**
 * Verifies login credentials
 * @param {string} email
 * @param {string} password
 * @return {boolean} true if valid
 */
async function login (email, password) {
  const hash = await User.getPasswordHashByEmail(email)
  if (hash) return await argon2.verify(hash, password)
  else return false
}

/**
 * Adds user and pwHash to db
 * @param {string} email
 * @param {string} password
 * @param {string|undefined} displayName
 * @return {boolean} true if success
 */
async function signUpWithEmailPassword (email, password, displayName = null) {
  const userFields = { userEmail: email, displayName }
  const userCreated = await User.createUser(userFields)
  const pwHash = await argon2.hash(password)
  if (!userCreated.insertId) return false

  const pwFields = { userID: userCreated.insertId, pwHash }
  const pwCreated = await User.createPassword(pwFields)
  if (!pwCreated.insertId) return false
  return true
}

/**
 * Adds user and OAuth info to db
 * @param {object} profile profile object from GitHub
 * @return {boolean} true if success
 */
async function signUpWithOAuth (profile) {
  const { id, avatar_url, name, email } = profile._json
  const userFields = { userEmail: email, displayName: name }
  const userCreated = await User.createUser(userFields)
  if (!userCreated.insertId) return false
  // @TODO upload avatar_url image to s3
  // @TODO insert s3 link to image db
  // @TODO update user avatar

  const gitHubOAuthFields = { userID: userCreated.insertId, GitHubUserID: id }
  const gitHubOAuthCreated = await User.createGitHubOAuth(gitHubOAuthFields)
  if (!gitHubOAuthCreated.insertId) return false
  return true
}

/**
 * Gets all user fields from db
 * @param {string|number} id user id
 * @return {object|null} user fields if user exists
 */
async function getUserByID (id) {
  const info = await User.getUserByID(id)
  return info ?? null
}

/**
 * Gets all user fields from db
 * @param {string} email
 * @return {object|null} user fields if user exists
 */
async function getUserByEmail (email) {
  const info = await User.getUserByEmail(email)
  return info ?? null
}
