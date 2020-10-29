import db from '../mysql.connect.js'
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

  getAllInactiveUsers,
  getAllFlaggedUsers
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
  return await query(
    'SELECT password_hash FROM UserPassword WHERE user_id = ?',
    [userID]
  )
}

/**
 * @param {object} fields { userID: [number], pwHash: [string] }
 * @return {}
 */
async function createPassword (fields) {
  const { userID, pwHash } = fields
  return await query(
    'INSERT INTO UserPassword SET user_id = ?, password_hash = ?',
    [userID, pwHash]
  )
}

/**
 * @param {object} fields { userID: [number], pwHash: [string} }
 * @return {}
 */
async function updatePassword (fields) {
  const { userID, pwHash } = fields
  return await query(
    'UPDATE UserPassword SET password_hash = ? WHERE user_id = ?',
    [pwHash, userID]
  )
}

/**
 * @param {number} githubUserID
 * @return {[object]} [ BinaryRow { data } ]
 */
async function getUserIDByGitHubOAuthUserID (githubUserID) {
  return await query(
    'SELECT user_id FROM GitHubOAuth WHERE oauth_user_id = ?',
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
  return await query(
    'SELECT github_user_id FROM GitHubOAuth WHERE user_id = ?',
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
 * @param {object} fields { userID: [number], githubUserID: [number] }
 * @return {object} ResultSetHeader
 */
async function createGitHubOAuth (fields) {
  const { userID, githubUserID } = fields
  return await query(
    'INSERT INTO GitHubOAuth SET user_id = ?, github_user_id = ?',
    [userID, githubUserID]
  )
}

/**
 * @param {object} fields { userID: [number], githubUserID: [number] }
 * @return {}
 */
async function updateGitHubOAuth (fields) {
  const { userID, githubUserID } = fields
  return await query(
    'UPDATE GitHubOAuth SET github_user_id = ? WHERE user_id = ?',
    [githubUserID, userID]
  )
}

/**
 * @param {object} fields { userEmail: [string] [, displayName: [string], avatarURL: [string] ]
 * @return {}
 */
async function createUser (fields) {
  const { userEmail, displayName, avatarURL } = fields
  return await query(
    'INSERT INTO User SET email = ?, display_name = ?, avatar_url = ?',
    [userEmail, displayName || null, avatarURL || null]
  )
}

/**
 * @param {object} fields { userID: [number], state: [1 == active | 0 == inactive] }
 * @return {}
 */
async function setUserActiveState (fields) {
  const { userID, state } = fields
  return await query(
    'UPDATE User SET active = ? WHERE id = ?',
    [state, userID]
  )
}

/**
 * @param {object} fields { userID: [number], reportFlat: [1 == true | 0 == false] }
 * @return {}
 */
async function setUserReportFlag (fields) {
  const { userID, reportFlag } = fields
  return await query(
    'UPDATE User set report_flag = ? WHERE id = ?',
    [reportFlag, userID]
  )
}

/**
 * @param {object} fields { userID: [number], displayName: [string]}
 * @return {}
 */
async function updateDisplayName (fields) {
  const { userID, displayName } = fields
  return await query(
    'UPDATE User SET display_name = ? WHERE id = ?',
    [displayName, userID]
  )
}

/**
 * @param {object} fields { userID: [number], dateTime: [string '2020-01-01 10:10:10']}
 * @return {}
 */
async function updateLastAccessed (fields) {
  const { userID, dateTime } = fields
  return await query(
    'UPDATE User SET last_accessed = ? WHERE id = ?',
    [dateTime, userID]
  )
}

/**
 * @param {object} fields { userID: [number], avatarURL: [string] }
 * @return {}
 */
async function updateAvatar (fields) {
  const { userID, avatarURL } = fields
  return await query(
    'UPDATE User SET avatar_url = ? WHERE id = ?',
    [avatarURL, userID]
  )
}

/**
 * @param {number} userID
 * @return {}
 */
async function deleteUser (userID) {
  return await query('DELETE FROM User WHERE id = ?', [userID])
}

/**
 * @return {} all users not active
 */
async function getAllInactiveUsers () {
  return await query('SELECT * from User WHERE active = 0', [])
}

/**
 * @return {} all users flagged
 */
async function getAllFlaggedUsers () {
  return await query('SELECT * from User WHERE report_flag = 1', [])
}
