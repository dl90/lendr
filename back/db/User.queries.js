import db from './mysql.connect.js'
const pool = db.pool.promise()

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
 * Pulls BinaryRow from asyncQuery result
 * @param {function} asyncQuery SQL query
 * @return {[object]} [ BinaryRow { data } ]
 */
async function handler (asyncQuery) {
  const [rows] = await asyncQuery
  return rows
}

/**
 * @param {string} userEmail user email
 * @return {[object]} [ BinaryRow { data } ]
 */
async function getEmail (userEmail) {
  return await handler(pool.execute(
    'SELECT email FROM User WHERE email = ?', [userEmail]
  ))
}

/**
 * @param {string} userEmail user email
 * @return {[object]} [ BinaryRow { data } ]
 */
async function getID (userEmail) {
  return await handler(pool.execute(
    'SELECT id FROM User WHERE email = ?', [userEmail]
  ))
}

/**
 * @param {number} userID user ID
 * @return {[object]} [ BinaryRow { data } ]
 */
async function getUserByID (userID) {
  return await handler(pool.execute(
    'SELECT * FROM User WHERE id = ?', [userID]
  ))
}

/**
 * @param {string} userEmail user email
 * @return {[object]} [ BinaryRow { data } ]
 */
async function getUserByEmail (userEmail) {
  return await handler(pool.execute(
    'SELECT * FROM User WHERE email = ?', [userEmail]
  ))
}

/**
 * @param {string} userEmail user email
 * @return {[object]} [ BinaryRow { data } ]
 */
async function getPasswordByUserEmail (userEmail) {
  return await handler(pool.execute(
    `SELECT password_hash, user_id FROM UserPassword
     JOIN User ON UserPassword.user_id = User.id
     WHERE User.email = ?`, [userEmail]
  ))
}

/**
 * @param {number} userID user id
 * @return {[object]} [ BinaryRow { data } ]
 */
async function getPasswordByUserID (userID) {
  return await handler(pool.execute(
    'SELECT password_hash FROM UserPassword WHERE user_id = ?', [userID]
  ))
}

/**
 * @param {object} fields { userID: [number], pwHash: [string] }
 * @return {}
 */
async function createPassword (fields) {
  const { userID, pwHash } = fields
  return await handler(pool.execute(
    'INSERT INTO UserPassword SET user_id = ?, password_hash = ?', [userID, pwHash]
  ))
}

/**
 * @param {object} fields { userID: [number], pwHash: [string} }
 * @return {}
 */
async function updatePassword (fields) {
  const { userID, pwHash } = fields
  return await handler(pool.execute(
    'UPDATE UserPassword SET password_hash = ? WHERE user_id = ?', [pwHash, userID]
  ))
}

/**
 * @param {number} githubUserID GitHub user id
 * @return {[object]} [ BinaryRow { data } ]
 */
async function getUserIDByGitHubOAuthUserID (githubUserID) {
  return await handler(pool.execute(
    'SELECT user_id FROM GitHubOAuth WHERE oauth_user_id = ?', [githubUserID]
  ))
}

/**
 * @param {number} githubUserID GitHub user id
 * @return {}
 */
async function getUserByGitHubOAuthUserID (githubUserID) {
  return await handler(pool.execute(
    `SELECT * FROM User
     JOIN GitHubOAuth ON GitHubOAuth.user_id = User.id
     WHERE GitHubOAuth.github_user_id = ? LIMIT 1`, [githubUserID]
  ))
}

/**
 * @param {number} userID userID
 * @return {[object]} [ BinaryRow { data } ]
 */
async function getGitHubOAuthUserIDByUserID (userID) {
  return await handler(pool.execute(
    'SELECT github_user_id FROM GitHubOAuth WHERE user_id = ?', [userID]
  ))
}

/**
 * @param {string} email user email
 * @return {}
 */
async function getGitHubOAuthUserIDByEmail (email) {
  return await handler(pool.execute(
    `SELECT github_user_id FROM GitHubOAuth
    JOIN User ON GitHubOauth.user_id = User.id
    WHERE User.email = ? LIMIT 1`, [email]
  ))
}

/**
 * @param {object} fields { userID: [number], githubUserID: [number] }
 * @return {object} ResultSetHeader
 */
async function createGitHubOAuth (fields) {
  const { userID, githubUserID } = fields
  return await handler(pool.execute(
    'INSERT INTO GitHubOAuth SET user_id = ?, github_user_id = ?', [userID, githubUserID]
  ))
}

/**
 * @param {object} fields { userID: [number], githubUserID: [number] }
 * @return {}
 */
async function updateGitHubOAuth (fields) {
  const { userID, githubUserID } = fields
  return await handler(pool.execute(
    'UPDATE GitHubOAuth SET github_user_id = ? WHERE user_id = ?', [githubUserID, userID]
  ))
}

/**
 * @param {object} fields { userEmail: [string] [, displayName: [string], avatarURL: [string]]
 * @return {}
 */
async function createUser (fields) {
  const { userEmail, displayName, avatarURL } = fields
  return await handler(pool.execute(
    'INSERT INTO User SET email = ?, display_name = ?, avatar_url = ?', [userEmail, displayName || null, avatarURL || null])
  )
}

/**
 * @param {object} state { userID: [number], state: [1 == active | 0 == inactive] }
 * @return {}
 */
async function setUserActiveState (fields) {
  const { userID, state } = fields
  return await handler(pool.execute(
    'UPDATE User SET active = ? WHERE id = ?', [state, userID]
  ))
}

/**
 * @param {object} fields { userID: [number], reportFlat: [1 == true | 0 == false] }
 * @return {}
 */
async function setUserReportFlag (fields) {
  const { userID, reportFlag } = fields
  return await handler(pool.execute(
    'UPDATE User set report_flag = ? WHERE id = ?', [reportFlag, userID]
  ))
}

/**
 * @param {object} fields { userID: [number], displayName: [string]}
 * @return {}
 */
async function updateDisplayName (fields) {
  const { userID, displayName } = fields
  return await handler(pool.execute(
    'UPDATE User SET display_name = ? WHERE id = ?', [displayName, userID]
  ))
}

/**
 * @param {object} fields { userID: [number], dateTime: [string '2020-01-01 10:10:10']}
 * @return {}
 */
async function updateLastAccessed (fields) {
  const { userID, dateTime } = fields
  return await handler(pool.execute(
    'UPDATE User SET last_accessed = ? WHERE id = ?', [dateTime, userID]
  ))
}

/**
 * @param {object} fields { userID: [number], avatarURL: [string] }
 * @return {}
 */
async function updateAvatar (fields) {
  const { userID, avatarURL } = fields
  return await handler(pool.execute(
    'UPDATE `User` SET `avatar_url` = ? WHERE `id` = ?', [avatarURL, userID]
  ))
}

/**
 * @param {number} userID userID: [number]
 * @return {}
 */
async function deleteUser (userID) {
  return await handler(pool.execute(
    'DELETE FROM `User` WHERE `id` = ?', [userID]
  ))
}

/**
 * @return {} all users not active
 */
async function getAllInactiveUsers () {
  return await handler(pool.execute(
    'SELECT * from User WHERE active = 0', []
  ))
}

/**
 * @return {} all users flagged
 */
async function getAllFlaggedUsers () {
  return await handler(pool.execute(
    'SELECT * from User WHERE report_flag = 1', []
  ))
}
