import db from '../mysql.connect.js'
const execute = db.dbExecute
const query = db.dbQuery

export default {
  getEmail,
  getID,
  getUserByID,
  getUserByEmail,

  getPasswordByUserEmail,
  getPasswordByUserID,
  createPassword,
  updatePassword,

  getUserIDByGitHubOAuthUserID,
  getUserByGitHubOAuthUserID,
  getGitHubOAuthUserIDByUserID,
  getGitHubOAuthUserIDByEmail,
  createGitHubOAuth,
  updateGitHubOAuth,

  createUser,
  setUserActiveState,
  setUserReportFlag,
  updateDisplayName,
  updateLastAccessed,
  updateAvatar,
  deleteUser,

  getAllUsers
}

/**
 * @param {string} userEmail
 * @return {[object]} [ BinaryRow { data } ]
 */
async function getEmail (userEmail) {
  return await query('SELECT email FROM User WHERE email = ?', [userEmail])
}

/**
 * @param {string} userEmail
 * @return {[object]} [ BinaryRow { data } ]
 */
async function getID (userEmail) {
  return await query('SELECT id FROM User WHERE email = ?', [userEmail])
}

/**
 * @param {number} userID
 * @return {[object]} [ BinaryRow { data } ]
 */
async function getUserByID (userID) {
  return await query('SELECT * FROM User WHERE id = ?', [userID])
}

/**
 * @param {string} userEmail
 * @return {[object]} [ BinaryRow { data } ]
 */
async function getUserByEmail (userEmail) {
  return await query('SELECT * FROM User WHERE email = ?', [userEmail])
}

/**
 * @param {string} userEmail
 * @return {[object]} [ BinaryRow { data } ]
 */
async function getPasswordByUserEmail (userEmail) {
  return await query(
    `SELECT password_hash, user_id FROM UserPassword
     JOIN User ON UserPassword.user_id = User.id
     WHERE User.email = ?`,
    [userEmail]
  )
}

/**
 * @param {number} userID
 * @return {[object]} [ BinaryRow { data } ]
 */
async function getPasswordByUserID (userID) {
  return await query('SELECT password_hash FROM UserPassword WHERE user_id = ?',
    [userID]
  )
}

/**
 * @param {object} fields
 * ```
 * { userID: [number], pwHash: [string] }
 * ```
 * @return {}
 */
async function createPassword (fields) {
  return await execute('INSERT INTO UserPassword SET user_id = ?, password_hash = ?',
    [fields.userID, fields.pwHash]
  )
}

/**
 * @param {object} fields
 * ```
 * { userID: [number], timeStamp: [string], pwHash: [string} }
 * ```
 * @return {}
 */
async function updatePassword (fields) {
  return await execute('UPDATE UserPassword SET password_hash = ?, updated_on = ? WHERE user_id = ?',
    [fields.pwHash, fields.timeStamp, fields.userID]
  )
}

/**
 * @param {number} githubUserID
 * @return {[object]} [ BinaryRow { data } ]
 */
async function getUserIDByGitHubOAuthUserID (githubUserID) {
  return await query('SELECT user_id FROM GitHubOAuth WHERE oauth_user_id = ?',
    [githubUserID]
  )
}

/**
 * @param {number} githubUserID
 * @return {[object]} [ BinaryRow { data } ]
 */
async function getUserByGitHubOAuthUserID (githubUserID) {
  return await query(
    `SELECT * FROM User
     JOIN GitHubOAuth ON GitHubOAuth.user_id = User.id
     WHERE GitHubOAuth.github_user_id = ? LIMIT 1`,
    [githubUserID]
  )
}

/**
 * @param {number} userID
 * @return {[object]} [ BinaryRow { data } ]
 */
async function getGitHubOAuthUserIDByUserID (userID) {
  return await query('SELECT github_user_id FROM GitHubOAuth WHERE user_id = ?',
    [userID]
  )
}

/**
 * @param {string} userEmail
 * @return {}
 */
async function getGitHubOAuthUserIDByEmail (userEmail) {
  return await query(
    `SELECT github_user_id FROM GitHubOAuth
    JOIN User ON GitHubOauth.user_id = User.id
    WHERE User.email = ? LIMIT 1`,
    [userEmail]
  )
}

/**
 * @param {object} fields
 * ```
 * { userID: [number], githubUserID: [number] }
 * ```
 * @return {object} ResultSetHeader
 */
async function createGitHubOAuth (fields) {
  return await execute('INSERT INTO GitHubOAuth SET user_id = ?, github_user_id = ?',
    [fields.userID, fields.githubUserID]
  )
}

/**
 * @param {object} fields
 * ```
 * { userID: [number], githubUserID: [number] }
 * ```
 * @return {}
 */
async function updateGitHubOAuth (fields) {
  return await execute(
    'UPDATE GitHubOAuth SET github_user_id = ? WHERE user_id = ?',
    [fields.githubUserID, fields.userID]
  )
}

/**
 * @param {object} fields
 * ```
 * { userEmail: [string] [, displayName: [string], avatarURL: [string] ] }
 * ```
 * @return {}
 */
async function createUser (fields) {
  return await execute(
    'INSERT INTO User SET email = ?, display_name = ?, avatar_url = ?',
    [fields.userEmail, fields.displayName || null, fields.avatarURL || null]
  )
}

/**
 * @param {object} fields
 * ```
 * { userID: [number], state: [boolean] }
 * ```
 * @return {}
 */
async function setUserActiveState (fields) {
  return await execute('UPDATE User SET active = ? WHERE id = ?',
    [fields.state, fields.userID]
  )
}

/**
 * @param {object} fields
 * ```
 * { userID: [number], reportFlag: [boolean] }
 * ```
 * @return {}
 */
async function setUserReportFlag (fields) {
  return await execute('UPDATE User set report_flag = ? WHERE id = ?',
    [fields.reportFlag, fields.userID]
  )
}

/**
 * @param {object} fields
 * ```
 * { userID: [number], displayName: [string]}
 * ```
 * @return {}
 */
async function updateDisplayName (fields) {
  return await execute('UPDATE User SET display_name = ? WHERE id = ?',
    [fields.displayName, fields.userID]
  )
}

/**
 * @param {object} fields
 * ```
 * { userID: [number], dateTime: [string: '2020-12-31 23:59:59']}
 * ```
 * @return {}
 */
async function updateLastAccessed (fields) {
  return await execute('UPDATE User SET last_accessed = ? WHERE id = ?',
    [fields.dateTime, fields.userID]
  )
}

/**
 * @param {object} fields
 * ```
 * { userID: [number], avatarURL: [string] }
 * ```
 * @return {}
 */
async function updateAvatar (fields) {
  return await execute('UPDATE User SET avatar_url = ? WHERE id = ?',
    [fields.avatarURL, fields.userID]
  )
}

/**
 * @param {number} userID
 * @return {}
 */
async function deleteUser (userID) {
  return await execute('DELETE FROM User WHERE id = ?', [userID])
}

/**
 * @param {object|undefined} fields
 * ```
 *  { [ active: [boolean], reportFlag: [boolean] ] }
 * ```
 */
async function getAllUsers (fields = undefined) {
  switch (true) {
    case (fields.active !== undefined && fields.reportFlag !== undefined):
      return await query('SELECT * FROM User WHERE active = ? AND report_flag = ?', [fields.active, fields.reportFlag])

    case (fields.active !== undefined):
      return await query('SELECT * FROM User Where active = ?', [fields.active])

    case (fields.reportFlag !== undefined):
      return await query('SELECT * FROM User WHERE report_flag = ?', [fields.reportFlag])

    default:
      console.log('default')
      return await query('SELECT * from User')
  }
}
