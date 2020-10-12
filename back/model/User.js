import db from '../db/User.queries.js'

/**
 * Checks if email is in db
 * @param {string} email
 * @returns {boolean} true if email exists and is equivalent
 */
async function checkEmail (email) {
  if (!validateEmail(email)) throw new Error(`invalid_email ${email}`)
  const result = await db.checkEmail(email)
  return result[0]?.email === email
}

/**
 * Gets user password hash from db
 * @param {string} email
 * @returns {string} password hash
 */
async function getPasswordHash (email) {
  if (!validateEmail(email)) throw new Error(`invalid_email ${email}`)
  const result = await db.getPassword(email)
  return result[0]?.password
}

/**
 * Gets user id from db
 * @param {string} email
 * @returns {number} user id
 */
async function getId (email) {
  if (!validateEmail(email)) throw new Error(`invalid_email ${email}`)
  const result = await db.getId(email)
  return result[0]?.id
}

/**
 * Gets all user fields from db
 * @param {number} id
 * @returns {object} JSON object
 */
async function getUser (id) {
  if (!checkId(id)) throw new Error(`invalid_id ${id}`)
  const result = await db.getUser(id)
  return result[0]
}

/**
 * Adds user to db
 * @param {object} fields
 * @returns {}
 */
async function createUser (fields) {
  const { email, pwHash, displayName } = fields
  if (!validateEmail(email)) throw new Error(`invalid_email ${email}`)
  if (!checkEmptyString(pwHash)) throw new Error(`invalid_password ${pwHash}`)
  if (!checkEmptyString(displayName)) fields.displayName = null
  return await db.createUser(fields)
}

/**
 * Updates password hash in db
 * @param {object} fields
 * @returns {}
 */
async function updatePassword (fields) {
  const { id, pwHash } = fields
  if (!checkId(id)) throw new Error(`invalid_id ${id}`)
  if (!checkEmptyString(pwHash)) throw new Error(`invalid_password ${pwHash}`)
  return await db.updatePassword(fields)
}

/**
 * Updates display name in db
 * @param {object} fields
 * @returns {}
 */
async function updateDisplayName (fields) {
  const { id, displayName } = fields
  if (!checkId(id)) throw new Error(`invalid_id ${id}`)
  if (!checkEmptyString(displayName)) throw new Error(`invalid_password ${displayName}`)
  return await db.updateDisplayName(fields)
}

/**
 * Updates avatar image id (PK image id) in db
 * @param {object} fields
 * @returns {}
 */
async function updateAvatar (fields) {
  const { id, imageID } = fields
  if (!checkId(id)) throw new Error(`invalid_id ${id}`)
  if (!checkId(imageID)) throw new Error(`invalid_id ${imageID}`)
  return await db.updateAvatar(fields)
}

/**
 * Deletes user from db
 * @param {number} id
 * @returns {}
 */
async function deleteUser (id) {
  if (!checkId(id)) throw new Error(`invalid_id ${id}`)
  return await db.deleteUser(id)
}

export default { checkEmail, getPasswordHash, getId, getUser, createUser, updatePassword, updateDisplayName, updateAvatar, deleteUser }

/* -------------------- util -------------------- */

/**
 * true if arg is not empty
 * @param {string} arg
 * @returns {boolean}
 */
function checkEmptyString (arg) {
  return (arg && arg.trim().length)
}

/**
 * true if id is a number above 0
 * @param {number} id
 * @return {boolean}
 */
function checkId (id) {
  return (parseInt(id) && id >= 0)
}

/**
 * true if email is valid
 * @param {*} email
 * @return {boolean}
 */
function validateEmail (email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(String(email).toLowerCase())
}
