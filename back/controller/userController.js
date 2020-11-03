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
 * ```
 *  User {
 *    id: 1,
 *    email: 'testy(at)test.com',
 *    display_name: 'Testy Test',
 *    avatar_image_id: 1,
 *    active: 1,
 *    report_flag: 0,
 *    last_accessed: '2020-01-12 00:00:01',
 *    created_at: '2020-01-12 00:00:01',
 *    rating: 0
 *  } || false
 * ```
 */
async function signUpWithEmailPassword (email, password, displayName = null) {
  const userFields = { userEmail: email, displayName }
  const userCreated = await handler.asyncErrorHandler(User.createUser, userFields)
  if (!userCreated.insertId) return false

  const pwHash = await argon2.hash(password)
  const pwFields = { userID: userCreated.insertId, pwHash }

  const pwCreated = await handler.asyncErrorHandler(User.createPassword, pwFields)
  if (!pwCreated.insertId) return false

  return await handler.asyncErrorHandler(User.getUserByEmail, email)
}

/**
 * Verifies login credentials
 * @param {string} email
 * @param {string} password
 * @return {object|false}
 * ```
 *  User {
 *    id: 1,
 *    email: 'testy(at)test.com',
 *    display_name: 'Testy Test',
 *    avatar_image_id: 1,
 *    active: 1,
 *    report_flag: 0,
 *    last_accessed: '2020-01-12 00:00:01',
 *    created_at: '2020-01-12 00:00:01',
 *    rating: 0
 *  } || false
 * ```
 */
async function login (email, password) {
  const queryResult = await handler.asyncErrorHandler(User.getPasswordHashByEmail, email)
  if (!queryResult) return false

  const match = await argon2.verify(queryResult.password_hash, password)
  if (!match) return false

  const formattedDateTime = util.generateFormattedDateTime()
  const fields = { userID: parseInt(queryResult.user_id), dateTime: formattedDateTime }
  const res = await handler.asyncErrorHandler(User.updateLastAccessed, fields)

  return res.changedRows === 1
    ? await handler.asyncErrorHandler(User.getUserByEmail, email)
    : false
}

/**
 * @param {string} email
 * @param {number} GitHubID
 * @param {string} name
 * @param {string} avatarURL
 * @return {object|false}
 * ```
 *  User {
 *    id: 1,
 *    email: 'testy(at)test.com',
 *    display_name: 'Testy Test',
 *    avatar_image_id: 1,
 *    active: 1,
 *    report_flag: 0,
 *    last_accessed: '2020-01-12 00:00:01',
 *    created_at: '2020-01-12 00:00:01',
 *    rating: 0
 *  } || false
 * ```
 */
async function signUpWithOAuth (email, GitHubID, name, avatarURL) {
  const userFields = { userEmail: email, displayName: name, avatarURL }
  const userCreated = await handler.asyncErrorHandler(User.createUser, userFields)
  if (!userCreated.insertId) return false

  const gitHubOAuthFields = { userID: userCreated.insertId, githubUserID: +GitHubID }
  const gitHubOAuthCreated = await handler.asyncErrorHandler(User.createGitHubOAuth, gitHubOAuthFields)
  if (!gitHubOAuthCreated.insertId) return false

  return await handler.asyncErrorHandler(User.getUserByEmail, email)
}

/**
 * @param {string} email
 * @param {string} gitHubID
 * @return {object|false}
 * ```
 *  User {
 *    id: 1,
 *    email: 'testy(at)test.com',
 *    display_name: 'Testy Test',
 *    avatar_image_id: 1,
 *    active: 1,
 *    report_flag: 0,
 *    last_accessed: '2020-01-12 00:00:01',
 *    created_at: '2020-01-12 00:00:01',
 *    rating: 0
 *  } || false
 * ```
 */
async function verifyGitHubOauth (email, gitHubID) {
  const userID = await User.getID(email)
  if (!userID) return false

  const storedGitHubID = await User.getGitHubOAuthIDByEmail(email)
  if (+gitHubID !== storedGitHubID) return false

  const formattedDateTime = util.generateFormattedDateTime()
  const fields = { userID: parseInt(userID), dateTime: formattedDateTime }
  const res = await User.updateLastAccessed(fields)
  return res.changedRows === 1
    ? await User.getUserByEmail(email)
    : false
}

/**
 * @param {string|number} id user id
 * @return {object|false} user fields if user exists
 */
async function getUserByID (id) {
  return await handler.asyncErrorHandler(User.getUserByID, +id) ?? false
}

/**
 * @param {string} email
 * @return {object|false} user fields if user exists
 */
async function getUserByEmail (email) {
  return await handler.asyncErrorHandler(User.getUserByEmail, email) ?? false
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
    { userID: +userID, pwHash }
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
    { userID: +userID, displayName }
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
    { userID: +userID, avatarURL }
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
    { userID: +userID, state }
  )
  return result.changedRows === 1
}

/**
 * @param {string|number} userID
 * @param {boolean} reportFlag
 * @return {boolean} true if changed
 */
async function updateReportFlag (userID, reportFlag) {
  const result = await handler.asyncErrorHandler(
    User.updateUserReportFlag,
    { userID: +userID, reportFlag }
  )
  return result.changedRows === 1
}

/**
 * @param {number} userID
 * @return {boolean} true if deleted
 */
async function deleteUser (userID) {
  const result = await handler.asyncErrorHandler(
    User.deleteUser, +userID
  )
  return result.affectedRows === 1
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
