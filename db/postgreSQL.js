//functions of connections to postgresql
const pool = require('../connection/connecSQL')

//all list table
const list = (table) => {
  return new Promise((resolve, reject) => {
    pool.query(`SELECT * FROM "${table}"`, (err, result) => {
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

//get Following
const getFollowing = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT * FROM user_follow
      JOIN users ON (users.id = user_follow.user_to)
      WHERE user_from = $1;`,
      [id],
      (err, result) => {
        if (err) return reject(err)
        resolve(
          result.rows.map(({ user_to, username }) => {
            let following = {
              user_to: user_to,
              username: username,
            }
            return following
          })
        )
      }
    )
  })
}

//get followers
const getFollowers = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT * FROM user_follow
      JOIN users ON (users.id = user_follow.user_from)
      WHERE user_to = $1;`,
      [id],
      (err, result) => {
        if (err) return reject(err)
        resolve(
          result.rows.map(({ user_from, username }) => {
            let followers = {
              user_to: user_from,
              username: username,
            }
            return followers
          })
        )
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
  const row = await get(table, data.id)
  if (row) {
    return update(table, data)
  } else {
    return insert(table, data)
  }
}

//add user following other user
const insertFollow = (table, data) => {
  return new Promise((resolve, reject) => {
    let from = data.user_from
    let to = data.user_to

    pool.query(
      `INSERT INTO "${table}" (user_from, user_to) VALUES ($1, $2)`,
      [from, to],
      (err, result) => {
        if (err) return reject(err)
        resolve(result.rows)
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

//delete follow in table user_follow
const Unfollowed = (user_to_id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `DELETE FROM "user_follow" WHERE user_to=$1`,
      [user_to_id],
      (err, res) => {
        if (err) return reject(err)
        resolve(res.rows)
      }
    )
  })
}

// remove item from table
const remove = (table, id) => {
  return new Promise((resolve, reject) => {
    pool.query(`DELETE FROM "${table}" WHERE id=$1`, [id], (err, result) => {
      if (err) return reject(err)
      resolve(result.rows)
    })
  })
}

//login and autentification
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
  getFollowing,
  getFollowers,
  upsert,
  insertFollow,
  removeOneUser,
  Unfollowed,
  remove,
  query,
}
