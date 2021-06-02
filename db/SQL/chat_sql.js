const pool = require('../../connection/connetSQL')

const getParams = (table, id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT * FROM "${table}" WHERE id=$1 OR users_from=$1 OR users_to=$1`,
      [id],
      (err, result) => {
        if (err) return reject(err)
        resolve(result.rows)
      }
    )
  })
}

const addChat = (table, data) => {
  return new Promise((resolve, reject) => {
    let id = data.id
    let users_from = data.users_from
    let users_to = data.users_to

    pool.query(
      `INSERT INTO "${table}" (id, users_from, users_to) VALUES ($1, $2, $3)`,
      [id, users_from, users_to],
      (err, result) => {
        if (err) return reject(err)
        resolve(result.rows[0])
      }
    )
  })
}

module.exports = {
  addChat,
  getParams,
}
