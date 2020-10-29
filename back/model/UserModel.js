import db from '../db/queries/User.queries.js'
import util from './util.js'

export default {
  checkEmail,
  getID,
  getPasswordHashByEmail,
  getPasswordHashByID,
  getGitHubOAuthIDByID,
  getGitHubOAuthIDByEmail,

  getUserByID,
  getUserByEmail,

  createUser,
  createPassword,
  createGitHubOAuth,

  updatePassword,
  updateDisplayName,
  updateAvatar,
  updateLastAccessed,
  updateGitHubOauth,
  updateActivateUser,
  updateUserReportFlag,
  deleteUser,

  getAllInactiveUsers,
  getAllFlaggedUsers
}

/**
 * Checks if email is in db
 * @param {string} userEmail
 * @return {boolean} true if email exists
 */
async function checkEmail (userEmail) {
  util.validateEmail(userEmail)
  const result = await db.getEmail(userEmail)
  return result[0]?.email === userEmail
}

/**
 * Gets user id from db
 * @param {string} userEmail
 * @return {number} user id
 */
async function getID (userEmail) {
  util.validateEmail(userEmail)
  const result = await db.getID(userEmail)
  return result[0]?.id
}

/**
 * Gets user password hash from db
 * @param {string} userEmail
 * @return {object} { password_hash, user_id }
 */
async function getPasswordHashByEmail (userEmail) {
  util.validateEmail(userEmail)
  if (util.DB_ENTRY_CHECK) await getEmail(userEmail)
  const result = await db.getPasswordByUserEmail(userEmail)
  return result[0]
}

/**
 * Gets user password hash from db
 * @param {number} userID
 * @return {string} password hash
 */
async function getPasswordHashByID (userID) {
  util.checkID(userID)
  const result = await db.getPasswordByUserID(userID)
  return result[0]?.password_hash
}

/**
 * Gets user GitHub OAuth ID from db
 * @param {number} userID
 * @return {}
 */
async function getGitHubOAuthIDByID (userID) {
  util.checkID(userID)
  const result = await db.getGitHubOAuthUserIDByUserID(userID)
  return result[0]?.github_user_id
}

/**
 * Gets user GitHub OAuth ID from db
 * @param {string} email
 * @return {string} GitHub OAuth user ID
 */
async function getGitHubOAuthIDByEmail (email) {
  util.validateEmail(email)
  const result = await db.getGitHubOAuthUserIDByEmail(email)
  return result[0]?.github_user_id
}

/**
 * Gets all user fields from db
 * @param {number} userID
 * @return {object} object
 */
async function getUserByID (userID) {
  util.checkID(userID)
  const result = await db.getUserByID(userID)
  return result[0]
}

/**
 * Gets all user fields from db
 * @param {string} userEmail
 * @return {object} object
 */
async function getUserByEmail (userEmail) {
  util.validateEmail(userEmail)
  if (util.DB_ENTRY_CHECK) await getEmail(userEmail)
  const result = await db.getUserByEmail(userEmail)
  return result[0]
}

/**
 * Adds user to db
 * @param {object} fields { userEmail: [string] [, displayName: [string], avatarURL: [string] ] }
 * @return {object|boolean} ResultSetHeader obj if success, **false** if failed
 * > ```
 * ResultSetHeader {
 *   fieldCount: 0,
 *   affectedRows: 1,
 *   insertId: 1,
 *   info: '',
 *   serverStatus: 2,
 *   warningStatus: 0
 * }
 * ```
 */
async function createUser (fields) {
  const { userEmail, displayName, avatarURL } = fields
  if (displayName) util.checkEmptyString(displayName)
  if (avatarURL) util.validateURL(avatarURL)
  const exist = await checkEmail(userEmail)
  if (!exist) return await db.createUser(fields)
  return false
}

/**
 * Adds user password hash to db
 * @param {object} fields { userID: [number], pwHash: [string] }
* @return {object|boolean} ResultSetHeader obj if success, **false** if failed
 * > ```
 * ResultSetHeader {
 *   fieldCount: 0,
 *   affectedRows: 1,
 *   insertId: 1,
 *   info: '',
 *   serverStatus: 2,
 *   warningStatus: 0
 * }
 * ```
 */
async function createPassword (fields) {
  const { userID, pwHash } = fields
  util.checkEmptyString(pwHash)
  util.checkID(userID)

  if (util.DB_ENTRY_CHECK) {
    const results = await db.getPasswordByUserID(userID)
    if (results.length > 0) util.existingEntry({ fields })
  }
  return await db.createPassword(fields)
}

/**
 * Add user GitHub OAuth info to db
 * @param {object} fields { userID: [number], githubUserID: [string], avatarURL: [string] }
 * @return {object|boolean} ResultSetHeader obj if success, **false** if failed
 * > ```
 * ResultSetHeader {
 *   fieldCount: 0,
 *   affectedRows: 1,
 *   insertId: 1,
 *   info: '',
 *   serverStatus: 2,
 *   warningStatus: 0
 * }
 * ```
 */
async function createGitHubOAuth (fields) {
  const { userID, githubUserID } = fields
  util.checkID(userID)
  util.checkID(githubUserID)

  if (util.DB_ENTRY_CHECK) {
    const results = await db.getGitHubOAuthUserIDByUserID(userID)
    if (results.length > 0) util.existingEntry(fields)
  }
  return await db.createGitHubOAuth(fields)
}

/**
 * Updates user password hash in db
 * @param {object} fields { userID: [number], pwHash: [string] }
 * @return {}
 */
async function updatePassword (fields) {
  const { userID, pwHash } = fields
  util.checkID(userID)
  util.checkEmptyString(pwHash)

  if (util.DB_ENTRY_CHECK) {
    const results = await db.getPasswordByUserID(fields)
    if (results.length === 0) util.missingEntry(fields)
  }
  return await db.updatePassword(fields)
}

/**
 * Updates display name in db
 * @param {object} fields { userID: [number], displayName: [string] }
 * @return {}
 */
async function updateDisplayName (fields) {
  const { userID, displayName } = fields
  util.checkID(userID)
  util.checkEmptyString(displayName)

  if (util.DB_ENTRY_CHECK) await getUser(userID)
  return await db.updateDisplayName(fields)
}

/**
 * Updates user avatar image id (PK image id) in db
 * @param {object} fields { userID: [number], avatarURL: [string] }
 * @return {}
 */
async function updateAvatar (fields) {
  const { userID, avatarURL } = fields
  util.checkID(userID)
  util.validateURL(avatarURL)

  if (util.DB_ENTRY_CHECK) await getUser(userID)
  return await db.updateAvatar(fields)
}

/**
 * Updates user last accessed datetime in db
 * - **note dateTime format:**
 * - **use util.generateFormattedDateTime() to generate dateTime time stamp**
 *
 * >```
 * // validator accepts only dateTime formatted as'2020-12-31 23:59:59'
 * const regex = /^[2][0]\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$/g
 * >```
 * @param {object} fields { userID: [number], dateTime: [string '2020-12-01 23:59:59'] }
 * @return {}
 */
async function updateLastAccessed (fields) {
  const { userID, dateTime } = fields
  util.checkID(userID)
  util.validateDateFormat(dateTime)

  return await db.updateLastAccessed(fields)
}

/**
 * Updates user GitHub OAuth info in db
 * @param {object} fields { userID: [number], avatarURL: [string] }
 * @return {}
 */
async function updateGitHubOauth (fields) {
  const { userID, githubUserID } = fields
  util.checkID(userID)
  util.checkID(githubUserID)

  if (util.DB_ENTRY_CHECK) {
    const results = await db.getGitHubOAuthUserIDByUserID(userID)
    if (results.length === 0) util.missingEntry(fields)
  }
  return await db.updateGitHubOAuth(fields)
}

/**
 * Update user active state
 * @param {object} fields { userID: [number], state: [1 || 0] }
 * @return {}
 */
async function updateActivateUser (fields) {
  const { userID, state } = fields
  util.checkID(userID)
  util.checkState(state)

  if (util.DB_ENTRY_CHECK) await getUser(userID)
  return await db.setUserActiveState(fields)
}

/**
 * Update user report flag
 * @param {object} fields { userID: [number], reportFlag: [1 || 0] }
 * @return {}
 */
async function updateUserReportFlag (fields) {
  const { userID, reportFlag } = fields
  util.checkID(userID)
  util.checkState(reportFlag)

  if (util.DB_ENTRY_CHECK) await getUser(userID)
  return await db.setUserReportFlag(fields)
}

/**
 * Deletes user from db
 * @param {number} userID
 * @return {}
 */
async function deleteUser (userID) {
  util.checkID(userID)

  if (util.DB_ENTRY_CHECK) await getUser(userID)
  return await db.deleteUser(userID)
}

/**
 * Returns all inactive users in db
 * @return {}
 */
async function getAllInactiveUsers () {
  return await db.getAllInactiveUsers()
}

/**
 * Returns all flagged users in db
 * @return {}
 */
async function getAllFlaggedUsers () {
  return await db.getAllFlaggedUsers()
}

/* -------------------- util -------------------- */

/**
 * throws error if user does not exist in db
 * @param {number} userID
 * @throw entry missing error
 */
async function getUser (userID) {
  const result = await db.getUserByID(userID)
  if (result.length === 0) util.missingEntry(userID)
}

/**
 * throws error if userEmail does not exist in db
 * @param {number} userEmail
 * @throw entry missing error
 */
async function getEmail (userEmail) {
  const result = await db.getEmail(userEmail)
  if (result.length === 0) util.missingEntry(userEmail)
}
