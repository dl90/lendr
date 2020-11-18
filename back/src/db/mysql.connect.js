import mysql from 'mysql2'
import dotenv from 'dotenv'
dotenv.config()

const pool = mysql.createPool({
  // debug: true,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PW,
  database: process.env.DB_DB,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
})

function connect (cb) {
  pool.getConnection((err, conn) => cb(err, conn))
}

/**
 * @param {string} query SQL query
 * @param {[*]} params
 * @return {[object]} [ BinaryRow { data } ]
 */
async function dbExecute (query, params) {
  const [rows] = await pool.promise().execute(query, params)
  return rows
}

/**
 * @param {string} query SQL query
 * @param {[*]} params
 * @return {[object]} [ BinaryRow { data } ]
 */
async function dbQuery (query, params) {
  const [rows] = await pool.promise().query(query, params)
  return rows
}

/**
 * @param {string} query
 * @param {[*]} params
 */
async function dbTransaction (query, params) {
  // const conn = await pool.getConnection()
  // await conn.beginTransaction()
  // await conn.query(query, params)
  // const result = await conn.commit()
  // await conn.release()
  // return result

  let result
  const connection = await pool.getConnection()
  try {
    await connection.query('START TRANSACTION')
    await connection.query(query, params)
    result = await connection.commit()
    await connection.release()
  } catch (e) {
    await connection.query('ROLLBACK')
    await connection.release()
  }
  return result
}

export default { connect, dbExecute, dbQuery, dbTransaction }