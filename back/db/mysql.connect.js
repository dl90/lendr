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
  pool.getConnection(err => cb(err))
}

/**
 * Queries database with .execute
 * @param {string} query SQL query
 * @param {[*]} values
 * @return {[object]} [ BinaryRow { data } ]
 */
async function dbExecute (query, values) {
  const [rows] = await pool.promise().execute(query, values)
  return rows
}

/**
 * Queries database with .query
 * @param {string} query SQL query
 * @param {[*]} values
 * @return {[object]} [ BinaryRow { data } ]
 */
async function dbQuery (query, values) {
  const [rows] = await pool.promise().query(query, values)
  return rows
}

export default { connect, dbExecute, dbQuery }
