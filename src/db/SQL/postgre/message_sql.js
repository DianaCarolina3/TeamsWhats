const pool = require('../../../connection/connetSQL-posgre')

const getMessage = (table, id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT * FROM "${table}" WHERE id_message=$1 OR chat=$1 OR username=$1`,
      [id],
      (err, result) => {
        if (err) return reject(err)
        resolve(result.rows[0])
      }
    )
  })
}

const addMessage = (table, data) => {
  return new Promise((resolve, reject) => {
    let id_message = data.id_message
    let chat = data.chat
    let username = data.username
    let user_name = data.user_name
    let message = data.message
    let date = data.date
    let file = data.file

    pool.query(
      `INSERT INTO "${table}" (
        id_message, chat, username, message, date, file, user_name)
        VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [id_message, chat, username, message, date, file, user_name],
      (err, result) => {
        if (err) return reject(err)
        resolve(result.rows[0])
      }
    )
  })
}

const updateMessage = (table, data) => {
  return new Promise((resolve, reject) => {
    let id_message = data.id_message
    let chat = data.chat
    let username = data.username
    let user_name = data.user_name
    let message = data.message
    let date = data.date
    let file = data.file

    pool.query(
      `UPDATE ${table} SET id_message=$1, chat=$2, username=$3, message=$4, date=$5, file=$6 , user_name=$7 WHERE id_message=$1`,
      [id_message, chat, username, message, date, file, user_name],
      (err, result) => {
        if (err) return reject(err)
        resolve(result.rows[0])
      }
    )

    if (!data.message) {
      pool.query(
        `UPDATE ${table} SET id_message=$1, chat=$2, username=$3, date=$4, file=$5, user_name=$6 WHERE id_message=$1`,
        [id_message, chat, username, date, file, user_name],
        (err, result) => {
          if (err) return reject(err)
          resolve(result.rows[0])
        }
      )
    }
    if (!data.file) {
      pool.query(
        `UPDATE ${table} SET id_message=$1, chat=$2, username=$3, message=$4, date=$5, user_name=$6 WHERE id_message=$1`,
        [id_message, chat, username, message, date, user_name],
        (err, result) => {
          if (err) return reject(err)
          resolve(result.rows[0])
        }
      )
    }
  })
}

const deleteMessage = (table, id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `DELETE FROM "${table}" WHERE id_message=$1`,
      [id],
      (err, result) => {
        if (err) return reject(err)
        resolve(result.rows)
      }
    )
  })
}

module.exports = {
  addMessage,
  updateMessage,
  deleteMessage,
  getMessage,
}
