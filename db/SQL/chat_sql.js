const pool = require('../../connection/connetSQL')

const conversations = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT * FROM chat, message WHERE chat = $1`,
      [id],
      (err, result) => {
        if (err) return reject(err)
        resolve(
          result.rows.map(
            ({
              users_from,
              users_to,
              id,
              id_message,
              chat,
              date,
              username,
              message,
              file,
            }) => {
              let data = {
                users_from: users_from,
                users_to: users_to,
                id: id,
                id_message: id_message,
                chat: chat,
                date: date,
                username: username,
                message: message,
                file: file,
              }
              return data
            }
          )
        )
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
  conversations,
}
