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

/*
CREATE TABLE `User` (
  `id`                      INTEGER PRIMARY KEY AUTO_INCREMENT,
  `email`                   VARCHAR(255) UNIQUE NOT NULL,
  `password`                VARCHAR(255) NOT NULL,
  `display_name`            VARCHAR(255) NOT NULL,
  `avatar_id`               INTEGER,
  `timestamp`               TIMESTAMP NOT NULL DEFAULT(NOW())

    -- FOREIGN KEY (avatar_id) REFERENCES image(id) ON DELETE CASCADE
);
*/

function getUsername (cb, username) {
  pool.execute('SELECT username FROM `users` WHERE `username` = ?', [username], cb)
}

function getPassword (cb, username) {
  pool.execute('SELECT password FROM `users` WHERE `username` = ?', [username], cb)
}

function createUser (cb, fields) {
  const { email, password } = fields
  pool.execute('INSERT INTO `users` SET `username` = ?, `password` = ?', [email, password], cb)
}

export default { connect, getUsername, getPassword, createUser }
