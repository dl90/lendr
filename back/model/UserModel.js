import db from '../db/User.queries.js'

// validates db entries before query (adds additional query)
const DB_ENTRY_CHECK = true

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
  validateEmail(userEmail)
  const result = await db.getEmail(userEmail)
  return result[0]?.email === userEmail
}

/**
 * Gets user id from db
 * @param {string} userEmail
 * @return {number} user id
 */
async function getID (userEmail) {
  validateEmail(userEmail)
  const result = await db.getID(userEmail)
  return result[0]?.id
}

/**
 * Gets user password hash from db
 * @param {string} userEmail
 * @return {object} { password_hash, user_id }
 */
async function getPasswordHashByEmail (userEmail) {
  validateEmail(userEmail)
  if (DB_ENTRY_CHECK) await getEmail(userEmail)
  const result = await db.getPasswordByUserEmail(userEmail)
  return result[0]
}

/**
 * Gets user password hash from db
 * @param {number} userID
 * @return {string} password hash
 */
async function getPasswordHashByID (userID) {
  checkID(userID)
  const result = await db.getPasswordByUserID(userID)
  return result[0]?.password_hash
}

/**
 * Gets user GitHub OAuth ID from db
 * @param {number} userID
 * @return {}
 */
async function getGitHubOAuthIDByID (userID) {
  checkID(userID)
  const result = await db.getGitHubOAuthUserIDByUserID(userID)
  return result[0]?.github_user_id
}

/**
 * Gets user GitHub OAuth ID from db
 * @param {string} email
 * @return {string} GitHub OAuth user ID
 */
async function getGitHubOAuthIDByEmail (email) {
  checkEmail(email)
  const result = await db.getGitHubOAuthUserIDByEmail(email)
  return result[0]?.github_user_id
}

/**
 * Gets all user fields from db
 * @param {number} userID
 * @return {object} JSON object
 */
async function getUserByID (userID) {
  checkID(userID)
  const result = await db.getUserByID(userID)
  return result[0]
}

/**
 * Gets all user fields from db
 * @param {string} userEmail
 * @return {object} JSON object
 */
async function getUserByEmail (userEmail) {
  validateEmail(userEmail)
  if (DB_ENTRY_CHECK) await getEmail(userEmail)
  const result = await db.getUserByEmail(userEmail)
  return result[0]
}

/**
 * Adds user to db
 * @param {object} fields { userEmail: [string] [, displayName: [string]] }
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
  const { userEmail, displayName } = fields
  if (displayName) checkEmptyString(displayName)
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
  checkEmptyString(pwHash)
  checkID(userID)

  if (DB_ENTRY_CHECK) {
    const results = await db.getPasswordByUserID(userID)
    if (results.length > 0) throw new Error(`${JSON.stringify({ userID })} <invalid argument: entry already exists>`)
  }
  return await db.createPassword(fields)
}

/**
 * Add user GitHub OAuth info to db
 * @param {object} fields { userID: [number], GitHubUserID: [string] }
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
  const { userID, GitHubUserID } = fields
  checkID(userID)
  checkID(GitHubUserID)

  if (DB_ENTRY_CHECK) {
    const results = await db.getGitHubOAuthUserIDByUserID(userID)
    if (results.length > 0) throw new Error(`${JSON.stringify({ userID })} <invalid argument: entry already exists>`)
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
  checkID(userID)
  checkEmptyString(pwHash)

  if (DB_ENTRY_CHECK) {
    const results = await db.getPasswordByUserID(fields)
    if (results.length === 0) throw new Error(`${JSON.stringify({ userID })} <invalid argument: entry does not exists>`)
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
  checkID(userID)
  checkEmptyString(displayName)

  if (DB_ENTRY_CHECK) await getUser(userID)
  return await db.updateDisplayName(fields)
}

/**
 * Updates user avatar image id (PK image id) in db
 * @param {object} fields { userID: [number], imageID: [number] }
 * @return {}
 */
async function updateAvatar (fields) {
  const { userID, imageID } = fields
  checkID(userID)
  checkID(imageID)

  if (DB_ENTRY_CHECK) await getUser(userID)
  return await db.updateAvatar(fields)
}

/**
 * Updates user last accessed datetime in db
 * - **note dateTime format:**
 *
 * >```
 * date.toISOString().split('T')[0] // 2020-12-31
 * time.toLocaleTimeString('it-IT') // 23:59:59
 * // validator accepts only '2020-12-31 23:59:59'
 * const regex = /^[2][0]\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$/g
 * >```
 * @param {object} fields { userID: [number], dateTime: [string '2020-12-01 23:59:59'] }
 * @return {}
 */
async function updateLastAccessed (fields) {
  const { userID, dateTime } = fields
  checkID(userID)

  const regex = /^[2][0]\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$/g
  if (!regex.test(dateTime)) invalidArgument(dateTime)
  return await db.updateLastAccessed(fields)
}

/**
 * Update user active state
 * @param {object} fields { userID: [number], state: [1 || 0] }
 * @return {}
 */
async function updateActivateUser (fields) {
  const { userID, state } = fields
  checkID(userID)
  checkState(state)

  if (DB_ENTRY_CHECK) await getUser(userID)
  return await db.setUserActiveState(fields)
}

/**
 * Update user report flag
 * @param {object} fields { userID: [number], reportFlag: [1 || 0] }
 * @return {}
 */
async function updateUserReportFlag (fields) {
  const { userID, reportFlag } = fields
  checkID(userID)
  checkState(reportFlag)

  if (DB_ENTRY_CHECK) await getUser(userID)
  return await db.setUserReportFlag(fields)
}

/**
 * Deletes user from db
 * @param {number} userID
 * @return {}
 */
async function deleteUser (userID) {
  checkID(userID)

  if (DB_ENTRY_CHECK) await getUser(userID)
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
 * throws error if arg is empty
 * @param {string} arg
 * @return {error}
 */
function checkEmptyString (arg) {
  if (!(arg && arg.trim().length)) invalidArgument(arg)
}

/**
 * throws error if id is not a number above 0
 * @param {number} id
 * @return {error}
 */
function checkID (id) {
  if (!(parseInt(id) && id >= 0)) invalidArgument(id)
}

/**
 * throws error if state is not 0 or 1
 * @param {number} state
 * @return {error}
 */
function checkState (state) {
  if (state !== 0 || state !== 1) invalidArgument(state)
}

/**
 * throws error if email is not valid
 * @param {string} email
 * @return {error}
 */
function validateEmail (email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!regex.test(String(email).toLowerCase())) invalidArgument(email)
}

/**
 * throws invalid argument error
 * @param {*} arg
 * @return {error}
 */
function invalidArgument (arg) {
  throw new Error(`${JSON.stringify({ arg })} <invalid argument>`)
}

/**
 * throws error if user does not exist in db
 * @param {number} userID
 */
async function getUser (userID) {
  const result = await db.getUserByID(userID)
  if (result.length === 0) throw new Error(`${JSON.stringify({ userID })} <invalid argument: entry does not exists>`)
}

/**
 * throws error if userEmail does not exist in db
 * @param {number} userEmail
 */
async function getEmail (userEmail) {
  const result = await db.getEmail(userEmail)
  if (result.length === 0) throw new Error(`${JSON.stringify({ userEmail })} <invalid argument: entry does not exists>`)
}
