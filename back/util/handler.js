export default {
  asyncErrorHandler
}

/**
 * Calls async function in try catch block
 * @param {function} func
 * @param {object} fields cb arguments
 * @return {object|false} false if error
 */
async function asyncErrorHandler (func, fields = null) {
  try {
    return fields ? await func(fields) : func()
  } catch (e) {
    console.log(e.message)
    return false
  }
}
