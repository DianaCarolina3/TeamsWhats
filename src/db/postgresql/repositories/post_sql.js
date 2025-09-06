const pool = require('../connection')

const addPost = (table, data) => {
  return new Promise((resolve, reject) => {
    let id = data.id
    let user_id = data.user_id
    let date = data.date
    let text = data.text
    let image = data.image

    pool.query(
      `INSERT INTO ${table} (
        id, date, user_id, text, image)
        VALUES ($1, $2, $3, $4, $5)`,
      [id, date, user_id, text, image],
      (err, result) => {
        if (err) return reject(err)
        resolve(result.rows[0])
      }
    )
  })
}

const updatePost = (table, data) => {
  return new Promise((resolve, reject) => {
    let id = data.id
    let date = data.date
    let text = data.text
    let image = data.image
    pool.query(
      `UPDATE ${table} SET date=$2, text=$3, image=$4 WHERE id=$1`,
      [id, date, text, image],
      (err, result) => {
        if (err) return reject(err)
        resolve(result.rows[0])
      }
    )

    if (!data.text) {
      pool.query(
        `UPDATE ${table} SET date=$2, image=$3 WHERE id=$1`,
        [id, date, image],
        (err, result) => {
          if (err) return reject(err)
          resolve(result.rows[0])
        }
      )
    }

    if (!data.image) {
      pool.query(
        `UPDATE ${table} SET date=$2, text=$3 WHERE id=$1`,
        [id, date, text],
        (err, result) => {
          if (err) return reject(err)
          resolve(result.rows[0])
        }
      )
    }
  })
}

module.exports = {
  addPost,
  updatePost,
}
