const pool = require('../connection')

const getPost = (table, id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT * FROM "${table}" WHERE like_from = $1 OR like_to_post = $1`,
      [id],
      (err, result) => {
        if (err) return reject(err)
        resolve(result.rows)
      }
    )
  })
}

const like = (table, data) => {
  return new Promise((resolve, reject) => {
    let from = data.like_from
    let to = data.like_to_post
    pool.query(
      `INSERT INTO "${table}" (like_from, like_to_post) VALUES ($1, $2)`,
      [from, to],
      (err, result) => {
        if (err) return reject(err)
        resolve(result.rows[0])
      }
    )
  })
}

const removePost = (table, id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `DELETE FROM "${table}" WHERE like_to_post=$1`,
      [id],
      (err, result) => {
        if (err) return reject(err)
        resolve(result.rows)
      }
    )
  })
}

module.exports = {
  like,
  getPost,
  removePost,
}
