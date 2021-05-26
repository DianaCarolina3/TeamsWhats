//functions of connections to postgresql
const pool = require('../connection/connecSQL')

//all list table
const list = (table) => {
  return new Promise((resolve, reject) => {
    pool.query(`SELECT * FROM "${table}" ORDER BY id ASC `, (err, result) => {
      if (err) return reject(err)
      resolve(result.rows)
    })
  })
}

//get item table
const get = (table, id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT * FROM "${table}" WHERE id = $1`,
      [id],
      (err, result) => {
        if (err) return reject(err)
        resolve(result.rows[0])
      }
    )
  })
}

//add to table
const insert = (table, data) => {
  return new Promise((resolve, reject) => {
    let id = data.id
    let name = data.name
    let username = data.username
    let password = data.password

    if (data.name) {
      if (data.password) {
        pool.query(
          `INSERT INTO "${table}"(
            id, name, username, password) VALUES ($1, $2, $3, $4)`,
          [id, name, username, password],
          (err, result) => {
            if (err) return reject(err)
            resolve(result.rows[0])
          }
        )
      } else {
        pool.query(
          `INSERT INTO "${table}"(
            id, name, username) VALUES ($1, $2, $3)`,
          [id, name, username],
          (err, result) => {
            if (err) return reject(err)
            resolve(result.rows[0])
          }
        )
      }
    } else {
      if (data.password) {
        pool.query(
          `INSERT INTO "${table}"(
            id, username, password) VALUES ($1, $2, $3)`,
          [id, username, password],
          (err, result) => {
            if (err) return reject(err)
            resolve(result.rows[0])
          }
        )
      } else {
        pool.query(
          `INSERT INTO "${table}"(
            id, username) VALUES ($1, $2)`,
          [id, username],
          (err, result) => {
            if (err) return reject(err)
            resolve(result.rows[0])
          }
        )
      }
    }
  })
}

//update item from table
const update = (table, data) => {
  return new Promise((resolve, reject) => {
    let id = data.id
    let name = data.name
    let username = data.username
    let password = data.password

    if (data.name) {
      if (data.password) {
        pool.query(
          `UPDATE "${table}" SET id=$1, name=$2, username=$3 password=$4 WHERE id=$1`,
          [id, name, username, password],
          (err, result) => {
            if (err) return reject(err)
            resolve(result)
          }
        )
      } else {
        pool.query(
          `UPDATE "${table}" SET id=$1, name=$2, username=$3 WHERE id=$1`,
          [id, name, username],
          (err, result) => {
            if (err) return reject(err)
            resolve(result)
          }
        )
      }
    } else {
      if (data.password) {
        pool.query(
          `UPDATE "${table}" SET id=$1, username=$2 password=$3 WHERE id=$1`,
          [id, username, password],
          (err, result) => {
            if (err) return reject(err)
            resolve(result)
          }
        )
      } else {
        pool.query(
          `UPDATE "${table}" SET id=$1, username=$2 WHERE id=$1`,
          [id, username],
          (err, result) => {
            if (err) return reject(err)
            resolve(result)
          }
        )
      }
    }
  })
}

const upsert = async (table, data) => {
  const row = await get(table, data.id)
  if (row) {
    return update(table, data)
  } else {
    return insert(table, data)
  }
}

//remove item from table
const remove = (table, id) => {
  return new Promise((resolve, reject) => {
    pool.query(`DELETE FROM "${table}" WHERE id=$1`, [id], (err, result) => {
      if (err) return reject(err)
      resolve(result.rows)
    })
  })
}

const query = (table, query) => {
  return new Promise((resolve, reject) => {
    let username = query.username

    pool.query(
      `SELECT * FROM "${table}" WHERE username=$1 `,
      [username],
      (err, result) => {
        if (err) return reject(err)
        resolve(result.rows[0])
      }
    )
  })
}

module.exports = {
  list,
  get,
  upsert,
  remove,
  query,
}
