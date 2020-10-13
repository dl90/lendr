import db from './connect.js'
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

async function handler (asyncQuery) {
  const [rows] = await asyncQuery
  return rows
}

/**
 * @param {string} userEmail user email
 * @returns {[object]} [ BinaryRow { data } ]
 */
async function getEmail (userEmail) {
  return await handler(pool.execute(
    'SELECT email FROM User WHERE email = ?', [userEmail]
  ))
}

/**
 * @param {string} userEmail user email
 * @returns {[object]} [ BinaryRow { data } ]
 */
async function getID (userEmail) {
  return await handler(pool.execute(
    'SELECT id FROM User WHERE email = ?', [userEmail]
  ))
}

/**
 * @param {number} userID user ID
 * @returns {[object]} [ BinaryRow { data } ]
 */
async function getUserByID (userID) {
  return await handler(pool.execute(
    'SELECT * FROM User WHERE id = ?', [userID]
  ))
}

/**
 * @param {string} userEmail user email
 * @returns {[object]} [ BinaryRow { data } ]
 */
async function getUserByEmail (userEmail) {
  return await handler(pool.execute(
    'SELECT * FROM User WHERE email = ?', [userEmail]
  ))
}

/**
 * @param {string} userEmail user email
 * @returns {[object]} [ BinaryRow { data } ]
 */
async function getPasswordByUserEmail (userEmail) {
  return await handler(pool.execute(
    `SELECT password_hash FROM UserPassword
     LEFT JOIN User ON UserPassword.user_id = User.id
     WHERE User.email = ? LIMIT 1`, [userEmail]
  ))
}

/**
 * @param {number} userID user id
 * @returns {[object]} [ BinaryRow { data } ]
 */
async function getPasswordByUserID (userID) {
  return await handler(pool.execute(
    'SELECT password_hash FROM UserPassword WHERE user_id = ?', [userID]
  ))
}

/**
 * @param {object} fields { userID: [number], pwHash: [string] }
 * @returns {}
 */
async function createPassword (fields) {
  const { userID, pwHash } = fields
  return await handler(pool.execute(
    'INSERT INTO UserPassword SET user_id = ?, password_hash = ?', [userID, pwHash]
  ))
}

/**
 * @param {object} fields { userID: [number], pwHash: [string} }
 * @returns {}
 */
async function updatePassword (fields) {
  const { userID, pwHash } = fields
  return await handler(pool.execute(
    'UPDATE UserPassword SET password_hash = ? WHERE user_id = ?', [pwHash, userID]
  ))
}

/**
 * @param {number} GitHubUserID GitHub user id
 * @returns {[object]} [ BinaryRow { data } ]
 */
async function getUserIDByGitHubOAuthUserID (GitHubUserID) {
  return await handler(pool.execute(
    'SELECT user_id FROM GitHubOAuth WHERE oauth_user_id = ?', [GitHubUserID]
  ))
}

/**
 * @param {number} GitHubUserID GitHub user id
 */
async function getUserByGitHubOAuthUserID (GitHubUserID) {
  return await handler(pool.execute(
    `SELECT * FROM User
     LEFT JOIN GitHubOAuth ON GitHubOAuth.user_id = User.id
     WHERE GitHubOAuth.github_user_id = ? LIMIT 1`, [GitHubUserID]
  ))
}

/**
 * @param {object} fields { userID: [number], oauthUserID: [number] }
 * @returns {}
 */
async function createGitHubOAuth (fields) {
  const { userID, GitHubUserID } = fields
  return await handler(pool.execute(
    'INSERT INTO GitHubOAuth SET user_id = ?, github_user_id = ?', [userID, GitHubUserID]
  ))
}

/**
 * @param {object} fields { userID: [number], GitHubUserID: [number] }
 * @returns {}
 */
async function updateGitHubOAuth (fields) {
  const { userID, GitHubUserID } = fields
  return await handler(pool.execute(
    'UPDATE GitHubOAuth SET github_user_id = ? WHERE user_id = ?', [GitHubUserID, userID]
  ))
}

/**
 * @param {object} fields { userEmail: [string] [, displayName: [string]]
 * @returns {}
 */
async function createUser (fields) {
  const { userEmail, displayName } = fields
  return await handler(pool.execute(
    'INSERT INTO User SET email = ?, display_name = ?', [userEmail, displayName || null])
  )
}

/**
 * @param {object} state { userID: [number], state: [1 == active | 0 == inactive] }
 * @returns {}
 */
async function setUserActiveState (fields) {
  const { userID, state } = fields
  return await handler(pool.execute(
    'UPDATE User SET active = ? WHERE id = ?', [state, userID]
  ))
}

/**
 * @param {object} fields { userID: [number], reportFlat: [1 == true | 0 == false] }
 * @returns {}
 */
async function setUserReportFlag (fields) {
  const { userID, reportFlag } = fields
  return await handler(pool.execute(
    'UPDATE User set report_flag = ? WHERE id = ?', [reportFlag, userID]
  ))
}

/**
 * @param {object} fields { userID: [number], displayName: [string]}
 * @returns {}
 */
async function updateDisplayName (fields) {
  const { userID, displayName } = fields
  return await handler(pool.execute(
    'UPDATE User SET display_name = ? WHERE id = ?', [displayName, userID]
  ))
}

/**
 * @param {object} fields { userID: [number], dateTime: [string '2020-01-01 10:10:10']}
 * @returns {}
 */
async function updateLastAccessed (fields) {
  const { userID, dateTime } = fields
  return await handler(pool.execute(
    'UPDATE User SET last_accessed = ? WHERE id = ?', [dateTime, userID]
  ))
}

/**
 * @param {object} fields { userID: [number], imageID: [number] }
 * @returns {}
 */
async function updateAvatar (fields) {
  const { userID, imageID } = fields
  return await handler(pool.execute(
    'UPDATE `User` SET `avatar_image_id` = ? WHERE `id` = ?', [imageID, userID]
  ))
}

/**
 * @param {number} userID userID: [number]
 * @returns {}
 */
async function deleteUser (userID) {
  return await handler(pool.execute(
    'DELETE FROM `User` WHERE `id` = ?', [userID]
  ))
}

/**
 * @returns {} all users not active
 */
async function getAllInactiveUsers () {
  return await handler(pool.execute(
    'SELECT * from User WHERE active = 0', []
  ))
}

/**
 * @returns {} all users flagged
 */
async function getAllFlaggedUsers () {
  return await handler(pool.execute(
    'SELECT * from User WHERE report_flag = 1', []
  ))
}
