const pool = require('../connection')

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

// update item from table
const update = (table, data) => {
  return new Promise((resolve, reject) => {
    let id = data.id
    let name = data.name
    let username = data.username
    let password = data.password

    if (data.name) {
      if (data.password) {
        pool.query(
          `UPDATE "${table}" SET id=$1, name=$2, username=$3, password=$4 WHERE id=$1`,
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
          `UPDATE "${table}" SET id=$1, username=$2, password=$3 WHERE id=$1`,
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
  const rowId = await get(table, data.id)
  if (rowId) {
    return update(table, data)
  } else {
    return insert(table, data)
  }
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
  upsert,
  removeOneUser,
}
