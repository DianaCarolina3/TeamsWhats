const pool = require('../connection')

const getMessage = (table, id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT * FROM "${table}" WHERE id_message=$1 OR chat_id=$1 OR sender_id=$1`,
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
    let chat_id = data.chat_id
    let sender_id = data.sender_id
    let sender_name = data.sender_name
    let message = data.message
    let file_url = data.file_url

    pool.query(
      `INSERT INTO "${table}" (
        id_message, chat_id, sender_id, sender_name, message, file_url)
        VALUES ($1, $2, $3, $4, $5, $6)`,
      [id_message, chat_id, sender_id, sender_name, message, file_url],
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
    let chat_id = data.chat_id
    let sender_id = data.sender_id
    let sender_name = data.sender_name
    let message = data.message
    let file_url = data.file_url

    pool.query(
      `UPDATE ${table} SET id_message=$1, chat_id=$2, sender_id=$3, sender_name=$4, message=$5 , file_url=$6 WHERE id_message=$1`,
      [id_message, chat_id, sender_id, sender_name, message, file_url],
      (err, result) => {
        if (err) return reject(err)
        resolve(result.rows[0])
      }
    )

    if (!data.message) {
      pool.query(
        `UPDATE ${table} SET id_message=$1, chat_id=$2, sender_id=$3, file_url=$4, sender_name=$5 WHERE id_message=$1`,
        [id_message, chat_id, sender_id, file_url, sender_name],
        (err, result) => {
          if (err) return reject(err)
          resolve(result.rows[0])
        }
      )
    }
    if (!data.file) {
      pool.query(
        `UPDATE ${table} SET id_message=$1, chat_id=$2, sender_id=$3, message=$4, sender_name=$5 WHERE id_message=$1`,
        [id_message, chat_id, sender_id, message, sender_name],
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
