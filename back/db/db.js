import mysql from 'mysql2'

const pool = mysql.createPool({
  host: 'localhost',
  user: 'don',
  password: 'don',
  database: 'auth',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
})

function connect (cb) {
  pool.getConnection(err => cb(err))
}

/*
DROP DATABASE IF EXISTS auth;
CREATE DATABASE auth;

CREATE TABLE users (
  id                      INTEGER PRIMARY KEY AUTO_INCREMENT,
  username                VARCHAR(255) UNIQUE NOT NULL,
  `password`              VARCHAR(255) NOT NULL,
  creation_time           TIMESTAMP NOT NULL DEFAULT NOW()
);
*/

function getUsername (cb, username) {
  pool.execute('SELECT username FROM `users` WHERE `username` = ?', [username], cb)
}

function getPassword (cb, username) {
  pool.execute('SELECT password FROM `users` WHERE `username` = ?', [username], cb)
}

function createUser (cb, username, password) {
  pool.execute('INSERT INTO `users` SET `username` = ?, `password` = ?', [username, password], cb)
}

export default { connect, getUsername, getPassword, createUser }
