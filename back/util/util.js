// validates db entries before query (adds additional query)
const DB_ENTRY_CHECK = true

export default {
  DB_ENTRY_CHECK,

  checkEmptyString,
  checkID,
  checkState,
  validateEmail,
  validateURL,

  invalidArgument,
  existingEntry,
  missingEntry,

  generateFormattedDateTime,
  validateDateFormat
}

/**
 * Throws error if arg is empty
 * @param {string} arg
 * @throw invalid argument error
 */
function checkEmptyString (arg) {
  if (!(arg && arg.trim().length)) invalidArgument(arg)
}

/**
 * Throws error if id is not a number above 0
 * @param {number} id
 * @throw invalid argument error
 */
function checkID (id) {
  if (!(parseInt(id) && id > 0)) invalidArgument(id)
}

/**
 * Throws error if state is not boolean
 * @param {number} state
 * @throw invalid argument error
 */
function checkState (state) {
  if (typeof state !== 'boolean') invalidArgument(state)
}

/**
 * Throws error if email is not valid
 * @param {string} email
 * @throw invalid argument error
 */
function validateEmail (email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!regex.test(String(email).toLowerCase())) invalidArgument(email)
}

/**
 * Throws error if url is not valid
 * @param {string} url
 * @throw invalid argument error
 */
function validateURL (url) {
  const regex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/
  if (!regex.test(String(url))) invalidArgument(url)
}

/**
 * Throws invalid argument error
 * @param {*} arg
 * @return {Error}
 */
function invalidArgument (arg) {
  throw new Error(`${JSON.stringify({ arg })} <invalid argument>`)
}

/**
 * Throws entry already exists error
 * @param {*} arg
 * @return {Error}
 */
function existingEntry (arg) {
  throw new Error(`${JSON.stringify({ arg })} <invalid argument: entry already exists>`)
}

/**
 * Throws entry missing error
 * @param {*} arg
 * @return {Error}
 */
function missingEntry (arg) {
  throw new Error(`${JSON.stringify({ arg })} <invalid argument: entry does not exist>`)
}

/**
 * Generates timestamp string
 * @return {string} '2020-12-30 23:59:59'
 */
function generateFormattedDateTime () {
  const dateTime = new Date().toISOString()
  return `${dateTime.slice(0, 10)} ${dateTime.slice(11, 19)}`
}

/**
 * Throws error if date not valid
 * @param {string} dateTime
 * @throw invalid argument error
 */
function validateDateFormat (dateTime) {
  const regex = /^[2][0]\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$/g
  if (!regex.test(dateTime)) invalidArgument(dateTime)
}
