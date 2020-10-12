import db from './connect.js'
const pool = db.pool.promise()

/*
  CREATE TABLE `User` (
    `id`                      INTEGER PRIMARY KEY AUTO_INCREMENT,
    `email`                   VARCHAR(255) UNIQUE NOT NULL,
    `password`                VARCHAR(255) NOT NULL,
    `display_name`            VARCHAR(255),
    `avatar_image_id`         INTEGER,
    `timestamp`               TIMESTAMP NOT NULL DEFAULT(NOW())
  );
*/

async function handler (asyncQuery) {
  const [rows] = await asyncQuery
  return rows
}

/**
 * @param {string} email user email
 * @returns {[object]} [ BinaryRow { data } ]
 */
async function checkEmail (email) {
  return await handler(pool.execute('SELECT `email` FROM `User` WHERE `email` = ?', [email]))
}

/**
 * @param {string} email user email
 * @returns {[object]} [ BinaryRow { data } ]
 */
async function getPassword (email) {
  return await handler(pool.execute('SELECT `password` FROM `User` WHERE `email` = ?', [email]))
}

/**
 * @param {string} email user email
 * @returns {[object]} [ BinaryRow { data } ]
 */
async function getId (email) {
  return await handler(pool.execute('SELECT `id` FROM `User` WHERE `email` = ?', [email]))
}

/**
 * @param {number} id user ID
 * @returns {[object]} [ BinaryRow { data } ]
 */
async function getUser (id) {
  return await handler(pool.execute('SELECT * FROM `User` WHERE `id` = ?', [id]))
}

/**
 * @param {object} fields { email, password [, displayName]
 * @returns {}
 */
async function createUser (fields) {
  const { email, pwHash, displayName } = fields
  return await handler(pool.execute(
    'INSERT INTO `User` SET `email` = ?, `password` = ?, `display_name` = ?',
    [email, pwHash, displayName || null])
  )
}

/**
 * @param {object} fields { id, password }
 * @returns {}
 */
async function updatePassword (fields) {
  const { id, pwHash } = fields
  return await handler(pool.execute('UPDATE `User` SET `password` = ? WHERE `id` = ?', [pwHash, id]))
}

/**
 * @param {object} fields { id, displayName }
 * @returns {}
 */
async function updateDisplayName (fields) {
  const { id, displayName } = fields
  return await handler(pool.execute('UPDATE `User` SET `display_name` = ? WHERE `id` = ?', [displayName, id]))
}

/**
 * @param {object} fields { id, imageID }
 * @returns {}
 */
async function updateAvatar (fields) {
  const { id, imageID } = fields
  return await handler(pool.execute('UPDATE `User` SET `avatar_image_id` = ? WHERE `id` = ?', [imageID, id]))
}

/**
 * @param {number} id user id
 * @returns {}
 */
async function deleteUser (id) {
  return await handler(pool.execute('DELETE FROM `User` WHERE `id` = ?', [id]))
}

export default { checkEmail, getPassword, getId, getUser, createUser, updatePassword, updateDisplayName, updateAvatar, deleteUser }
