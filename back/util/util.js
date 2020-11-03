// validates db entries before query (adds additional query)
const DB_ENTRY_CHECK = true

export default {
  DB_ENTRY_CHECK,

  checkEmptyString,
  checkID,
  checkStatus,
  checkSmallInt,
  checkBool,
  validateEmail,
  validateURL,
  validateRate,

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
  if (!arg || arg.trim().length === 0) invalidArgument(arg)
}

/**
 * Throws error if id is not a number above 0
 * @param {number} id
 * @throw invalid argument error
 */
function checkID (id) {
  if (id <= 0) invalidArgument(id)
}

/**
 * Throws error if status is not 0 || 1
 * @param {0|1} status
 * @throw invalid argument error
 */
function checkStatus (status) {
  if (!(status !== 0 || status !== 1)) invalidArgument(status)
}

/**
 * Throws error if arg is not smallInt (0 <= x <= 32767)
 * @param {number} smallInt
 * @throw invalid argument error
 */
function checkSmallInt (smallInt) {
  if (smallInt < 0 || smallInt > 32767) (invalidArgument(smallInt))
}

/**
 * Throws error if arg is not boolean
 * @param {number} arg
 * @throw invalid argument error
 */
function checkBool (arg) {
  if (typeof arg !== 'boolean') invalidArgument(arg)
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
 * Throws error if rate has more than 2 decimal places or is over 1 million
 * @param {number} rate
 * @throw invalid argument error
 */
function validateRate (rate) {
  if (rate > 1000000000) invalidArgument(rate)
  if (~~rate !== rate) {
    const decimal = rate.toString().split('.')[1].length || 0
    if (decimal > 2) invalidArgument(rate)
  }
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
 * Generates timestamp string at call time
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
