import argon2 from 'argon2'
import User from '../model/UserModel.js'
import util from '../util/util.js'
import handler from '../util/handler.js'

export default {
  signUpWithEmailPassword,
  login,
  signUpWithOAuth,
  verifyGitHubOauth,

  getUserByID,
  getUserByEmail,

  updatePassword,
  updateDisplayName,
  updateAvatar,
  updateActive,
  updateReportFlag,

  deleteUser,

  getAllInactiveUsers,
  getAllFlaggedUsers
}

/**
 * Adds user and pwHash to db
 * @param {string} email
 * @param {string} password
 * @param {string|undefined} displayName
 * @return {object|false}
 * >```
 * {
 *    id: 1,
 *    email: 'testy(at)test.com',
 *    display_name: 'Testy Test',
 *    avatar_image_id: 1,
 *    active: 1,
 *    report_flag: 0,
 *    last_accessed: '2020-01-12 00:00:01',
 *    created_at: '2020-01-12 00:00:01',
 *    rating: 0
 * }
 * ```
 */
async function signUpWithEmailPassword (email, password, displayName = null) {
  const userFields = { userEmail: email, displayName }
  const userCreated = await User.createUser(userFields)
  const pwHash = await argon2.hash(password)
  if (!userCreated.insertId) return false

  const pwFields = { userID: userCreated.insertId, pwHash }
  const pwCreated = await User.createPassword(pwFields)
  if (!pwCreated.insertId) return false
  return await User.getUserByEmail(email)
}

/**
 * Verifies login credentials
 * @param {string} email
 * @param {string} password
 * @return {object|false}
 * >```
 * {
 *    id: 1,
 *    email: 'testy(at)test.com',
 *    display_name: 'Testy Test',
 *    avatar_image_id: 1,
 *    active: 1,
 *    report_flag: 0,
 *    last_accessed: '2020-01-12 00:00:01',
 *    created_at: '2020-01-12 00:00:01',
 *    rating: 0
 * }
 * ```
 */
async function login (email, password) {
  const queryResult = await User.getPasswordHashByEmail(email)
  const match = await argon2.verify(queryResult.password_hash, password)
  if (!match) return false

  const formattedDateTime = util.generateFormattedDateTime()
  const fields = { userID: parseInt(queryResult.user_id), dateTime: formattedDateTime }
  const res = await User.updateLastAccessed(fields)
  if (res.changedRows === 1) return await User.getUserByEmail(email)
  return false
}

/**
 * @param {string} email
 * @param {string} GitHubID
 * @param {string} name
 * @param {string} avatarURL
 * @return {object|false}
 * >```
 * {
 *    id: 1,
 *    email: 'testy(at)test.com',
 *    display_name: 'Testy Test',
 *    avatar_image_id: 1,
 *    active: 1,
 *    report_flag: 0,
 *    last_accessed: '2020-01-12 00:00:01',
 *    created_at: '2020-01-12 00:00:01',
 *    rating: 0
 * }
 * ```
 */
async function signUpWithOAuth (email, GitHubID, name, avatarURL) {
  const userFields = { userEmail: email, displayName: name, avatarURL }
  const userCreated = await User.createUser(userFields)
  if (!userCreated.insertId) return false

  const gitHubOAuthFields = { userID: userCreated.insertId, githubUserID: GitHubID }
  const gitHubOAuthCreated = await User.createGitHubOAuth(gitHubOAuthFields)
  if (!gitHubOAuthCreated.insertId) return false
  return await User.getUserByEmail(email)
}

/**
 * @param {string} email
 * @param {string} gitHubID
 * @return {object|false}
 * >```
 * {
 *    id: 1,
 *    email: 'testy(at)test.com',
 *    display_name: 'Testy Test',
 *    avatar_image_id: 1,
 *    active: 1,
 *    report_flag: 0,
 *    last_accessed: '2020-01-12 00:00:01',
 *    created_at: '2020-01-12 00:00:01',
 *    rating: 0
 * }
 * ```
 */
async function verifyGitHubOauth (email, gitHubID) {
  const userID = await User.getID(email)
  if (!userID) return false

  const storedGitHubID = await User.getGitHubOAuthIDByEmail(email)
  if (gitHubID === storedGitHubID) {
    const formattedDateTime = util.generateFormattedDateTime()
    const fields = { userID: parseInt(userID), dateTime: formattedDateTime }
    const res = await User.updateLastAccessed(fields)
    if (res.changedRows === 1) return await User.getUserByEmail(email)
    else return false
  }
  return false
}

/**
 * @param {string|number} id user id
 * @return {object|null} user fields if user exists
 */
async function getUserByID (id) {
  const result = await handler.asyncErrorHandler(
    User.getUserByID, parseInt(id)
  )
  return result ?? null
}

/**
 * @param {string} email
 * @return {object|null} user fields if user exists
 */
async function getUserByEmail (email) {
  const result = await handler.asyncErrorHandler(
    User.getUserByEmail, email
  )
  return result ?? null
}

/**
 * @param {number} userID
 * @param {string} newPassword
 * @return {boolean} true if changed
 */
async function updatePassword (userID, newPassword) {
  const pwHash = await handler.asyncErrorHandler(argon2.hash, newPassword)
  if (!pwHash) return false
  const result = await handler.asyncErrorHandler(
    User.updatePassword,
    { userID, pwHash }
  )
  return result.changedRows === 1
}

/**
 * @param {number} userID
 * @param {string} displayName
 * @return {boolean} true if changed
 */
async function updateDisplayName (userID, displayName) {
  const result = await handler.asyncErrorHandler(
    User.updateDisplayName,
    { userID, displayName }
  )
  return result.changedRows === 1
}

/**
 * @param {number} userID
 * @param {string} avatarURL
 * @return {boolean} true if changed
 */
async function updateAvatar (userID, avatarURL) {
  const result = await handler.asyncErrorHandler(
    User.updateAvatar,
    { userID, avatarURL }
  )
  return result.changedRows === 1
}

/**
 * @param {number} userID
 * @param {boolean|1|0} state
 * @return {boolean} true if changed
 */
async function updateActive (userID, state) {
  const result = await handler.asyncErrorHandler(
    User.updateActivateUser,
    { userID, state }
  )
  return result.changedRows === 1
}

/**
 * @param {number} userID
 * @param {boolean|1|0} reportFlag
 * @return {boolean} true if changed
 */
async function updateReportFlag (userID, reportFlag) {
  const result = await handler.asyncErrorHandler(
    User.updateUserReportFlag,
    { userID, reportFlag }
  )
  return result.changedRows === 1
}

/**
 * @param {number} userID
 * @return {boolean} true if deleted
 */
async function deleteUser (userID) {
  const result = await handler.asyncErrorHandler(
    User.deleteUser, userID
  )
  return result.changedRows === 1
}

/**
 * Returns all inactive users
 * @return {[object]}
 */
async function getAllInactiveUsers () {
  return await handler.asyncErrorHandler(
    User.getAllInactiveUsers
  )
}

/**
 * Returns all flagged users
 * @return {[object]}
 */
async function getAllFlaggedUsers () {
  return await handler.asyncErrorHandler(
    User.getAllFlaggedUsers
  )
}
