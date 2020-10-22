import argon2 from 'argon2'
import User from '../model/UserModel.js'

export default {
  signUpWithEmailPassword,
  login,
  signUpWithOAuth,
  verifyGitHubOauth,

  getUserByID,
  getUserByEmail,

  updatePassword
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
 * Verifies login credentials
 * @param {string} email
 * @param {string} password
 * @return {boolean} true if valid
 */
async function login (email, password) {
  const queryResult = await User.getPasswordHashByEmail(email)
  const match = await argon2.verify(queryResult.password_hash, password)
  if (!match) return false

  const formattedDateTime = generateFormattedDateTime()
  const fields = { userID: parseInt(queryResult.user_id), dateTime: formattedDateTime }
  return await User.updateLastAccessed(fields)
}

/**
 * Adds user and GitHub OAuth info to db
 * @param {string} email
 * @param {string} GitHubID
 * @param {string} name
 * @param {string} avatarURL
 * @return {object|false} { userID } || false if failed
 */
async function signUpWithOAuth (email, GitHubID, name, avatarURL) {
  const userFields = { userEmail: email, displayName: name }
  const userCreated = await User.createUser(userFields)
  if (!userCreated.insertId) return false

  // @TODO upload avatar_url image to s3
  // @TODO insert s3 link to image db
  // @TODO update user avatar
  console.log(avatarURL)

  const gitHubOAuthFields = { userID: userCreated.insertId, GitHubUserID: GitHubID }
  const gitHubOAuthCreated = await User.createGitHubOAuth(gitHubOAuthFields)
  if (!gitHubOAuthCreated.insertId) return false
  return await User.getUserByEmail(email)
}

/**
 * Checks if GitHub OAuth matches
 * @param {string} email
 * @param {string} gitHubID
 * @return {object|false} { userID } || false if failed
 */
async function verifyGitHubOauth (email, gitHubID) {
  const userID = await User.getID(email)
  if (!userID) return false

  const storedGitHubID = await User.getGitHubOAuthIDByEmail(email)
  if (gitHubID === storedGitHubID) {
    const formattedDateTime = generateFormattedDateTime()
    const fields = { userID: parseInt(userID), dateTime: formattedDateTime }
    const res = await User.updateLastAccessed(fields)
    if (res.changedRows === 1) return await User.getUserByEmail(email)
    else return false
  }
  return false
}

/**
 * Updates user pwHash to db
 * @param {string} email
 * @param {string} password
 * @param {number|undefined} id
 * @return {boolean} true if success
 */
async function updatePassword (email, password, id = undefined) {
  const pwHash = await argon2.hash(password)

  if (id) {
    const fields = { userID: id, pwHash }
    const result = await User.updatePassword(fields)
    console.log(result)
    if (result) return true
  } else {
    const id = await User.getID(email)
    const fields = { userID: id, pwHash }
    const result = await User.updatePassword(fields)
    console.log(result)
    if (result) return true
  }
  return false
}

/**
 * Gets all user fields from db
 * @param {string|number} id user id
 * @return {object|null} user fields if user exists
 */
async function getUserByID (id) {
  const info = await User.getUserByID(parseInt(id))
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

/* -------------------- util -------------------- */

function generateFormattedDateTime () {
  const dateTime = new Date().toISOString()
  return `${dateTime.slice(0, 10)} ${dateTime.slice(11, 19)}`
}
