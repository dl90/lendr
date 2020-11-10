export default {
  asyncErrorHandler
}

/**
 * Calls async function in try catch block
 * @param {function} func
 * @param {object} fields cb arguments
 * @param {string} message
 * @return {object|false} false if error
 */
async function asyncErrorHandler (func, fields = null, message = '') {
  try {
    return fields ? await func(fields) : await func()
  } catch (e) {
    console.log(message, new Date(), e.message)
    return false
  }
}
