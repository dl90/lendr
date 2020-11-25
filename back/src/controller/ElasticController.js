import Elastic from '../db/elastic.connect.js'
import util from '../util/util.js'

export default {
  search,
  index
}

/**
 * @param {object} fields
 * @param {string} fields.title
 */
async function search (title) {
  try {
    util.checkEmptyString(title)
    const response = await Elastic.search({
      index: 'post',
      body: {
        query: { match: { title } }
      },
      sort: { _score: { order: 'desc' } },
      from: 0,
      size: 10
    })
    // console.log(response.body.hits)
    return response.body.hits.hits
  } catch (e) {
    console.log(e.message)
    return false
  }
}

/**
 * @param {object} fields
 * ```
 *  {
 *    id: 1,
 *    title: 'Dell XPS 13 for rent',
 *    rate: 20.00,
 *    location: 'Vancouver',
 *    duration: 2020-12-17T01:42:47.000Z,
 *    item_id: 1,
 *    user_id: 1
 *  }
 * ```
 */
async function index (fields) {
  try {
    const result = await Elastic.index({
      index: 'post',
      body: {
        postID: fields.id,
        title: fields.title,
        rate: fields.rate,
        location: fields.location,
        duration: fields.duration,
        itemID: fields.itemID,
        userID: fields.userID
      }
    })
    return result.statusCode === 201
  } catch (e) {
    console.log(e.message)
    return false
  }
}
