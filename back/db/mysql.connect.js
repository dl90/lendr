import mysql from 'mysql2'
import dotenv from 'dotenv'
dotenv.config()

const pool = mysql.createPool({
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
 * Queries database
 * @param {string} query SQL query
 * @param {[*]} queryParams
 * @return {[object]} [ BinaryRow { data } ]
 */
async function dbQuery (query, queryParams) {
  const [rows] = await pool.promise().execute(query, queryParams)
  return rows
}

export default { connect, dbQuery }
