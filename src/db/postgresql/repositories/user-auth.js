const pool = require('../connection')

const usernameExists = (table, username) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT username FROM ${table}
                WHERE username=$1`,
      [username],
      (err, result) => {
        if (err) return reject(err)
        resolve(result.rows[0])
      }
    )
  })
}

const insertInUser = (table, data) => {
  return new Promise((resolve, reject) => {
    let id = data.id
    let name = data.name
    let username = data.username

    pool.query(
      `INSERT INTO "${table}"(
            id, name, username) VALUES ($1, $2, $3) 
              RETURNING *`,
      [id, name, username],
      (err, result) => {
        if (err) return reject(err)
        resolve(result.rows[0])
      }
    )
  })
}

const insertInAuth = (table, data) => {
  return new Promise((resolve, reject) => {
    let id = data.id
    let user_id = data.user_id
    let username = data.username
    let password = data.password

    pool.query(
      `INSERT INTO "${table}"(
            id, user_id, username, password) VALUES ($1, $2, $3, $4)`,
      [id, user_id, username, password],
      (err, result) => {
        if (err) return reject(err)
        resolve(result)
      }
    )
  })
}
// Update tables auth and users
const updateInUser = (table, data, idUser) => {
  return new Promise((resolve, reject) => {
    let id = idUser
    let name = data.name
    let username = data.username

    pool.query(
      `UPDATE "${table}" SET 
            name=COALESCE($1, name), username=COALESCE($2, username) 
            WHERE id=$3 RETURNING *`,
      [name, username, id],
      (err, result) => {
        if (err) return reject(err)
        resolve(result.rows[0])
      }
    )
  })
}

const updateInAuth = (table, data, idUser) => {
  return new Promise((resolve, reject) => {
    let user_id = idUser
    let username = data.username
    let password = data.password

    pool.query(
      `UPDATE "${table}" SET
            username=COALESCE($1, username), password=COALESCE($2, password) WHERE user_id=$3`,
      [username, password, user_id],
      (err, result) => {
        if (err) return reject(err)
        resolve(result.rows[0])
      }
    )
  })
}

//remove user in auth table
const removeInAuth = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(`DELETE FROM "auth" WHERE id=$1`, [id], (err, result) => {
      if (err) return reject(err)
      resolve(result.rows)
    })
  })
}

//remove user in table user
const removeInUser = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(`DELETE FROM "users" WHERE id=$1`, [id], (err, result) => {
      if (err) return reject(err)
      resolve(result.rows)
    })
  })
}

const removeOneUser = (id) => {
  if (id) {
    removeInAuth(id)
    removeInUser(id)
  }
}

module.exports = {
  usernameExists,
  insertInUser,
  insertInAuth,
  updateInUser,
  updateInAuth,
  removeOneUser,
}
