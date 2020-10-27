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
 * Pulls BinaryRow from asyncQuery result
 * @param {function} asyncQuery SQL query
 * @return {[object]} [ BinaryRow { data } ]
 */
async function handler (asyncQuery) {
  const [rows] = await asyncQuery
  return rows
}

export default { pool, connect, handler }
