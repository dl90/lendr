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
  missingEntry
}

/**
 * throws error if arg is empty
 * @param {string} arg
 * @throw invalid argument error
 */
function checkEmptyString (arg) {
  if (!(arg && arg.trim().length)) invalidArgument(arg)
}

/**
 * throws error if id is not a number above 0
 * @param {number} id
 * @throw invalid argument error
 */
function checkID (id) {
  if (!(parseInt(id) && id > 0)) invalidArgument(id)
}

/**
 * throws error if state is not 0 or 1
 * @param {number} state
 * @throw invalid argument error
 */
function checkState (state) {
  if (state !== 0 || state !== 1) invalidArgument(state)
}

/**
 * throws error if email is not valid
 * @param {string} email
 * @throw invalid argument error
 */
function validateEmail (email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!regex.test(String(email).toLowerCase())) invalidArgument(email)
}

/**
 * throws error if url is not valid
 * @param {string} url
 * @throw invalid argument error
 */
function validateURL (url) {
  const regex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/
  if (!regex.test(String(url))) invalidArgument(url)
}

/**
 * throws invalid argument error
 * @param {*} arg
 * @return {Error}
 */
function invalidArgument (arg) {
  throw new Error(`${JSON.stringify({ arg })} <invalid argument>`)
}

/**
 * throws entry already exists error
 * @param {*} arg
 * @return {Error}
 */
function existingEntry (arg) {
  throw new Error(`${JSON.stringify({ arg })} <invalid argument: entry already exists>`)
}

/**
 * throws entry missing error
 * @param {*} arg
 * @return {Error}
 */
function missingEntry (arg) {
  throw new Error(`${JSON.stringify({ arg })} <invalid argument: entry does not exist>`)
}
