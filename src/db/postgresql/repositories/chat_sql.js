const pool = require('../connection')
const error = require('../../../utils/error')

const oneChat = (table, id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT * FROM "${table}" JOIN message ON (message.chat_id = chat.id) WHERE chat.id = $1`,
      [id],
      (err, result) => {
        if (err) return reject(err)
        resolve(
          result.rows.map(
            ({
              chat_id,
              users_one,
              users_two,
              id_message,
              send_at,
              sender_id,
              sender_name,
              message,
              file_url,
            }) => {
              let data = {
                chat_id: chat_id,
                users_one: users_one,
                users_two: users_two,
                id_message: id_message,
                send_at: send_at,
                sender_id: sender_id,
                sender_name: sender_name,
                message: message,
                file_url: file_url,
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
    let users_one = data.users_one
    let users_two = data.users_two

    pool.query(
      `INSERT INTO "${table}" (id, users_one, users_two) VALUES ($1, $2, $3)`,
      [id, users_one, users_two],
      (err, result) => {
        if (err) {
          if (err.code === '23505') {
            return reject(
              error('You cannot have two chats with the same user'),
              400
            )
          } else {
            return reject(err)
          }
        }
        resolve(result.rows[0])
      }
    )
  })
}

module.exports = {
  addChat,
  oneChat,
}
