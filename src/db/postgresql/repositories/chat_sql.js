const pool = require('../connection')

const conversations = () => {
  console.log('conversations')
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT * FROM chat, message WHERE message.chat_id = chat.id;`,
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

const oneConversations = (table, id) => {
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
        if (err) return reject(err)
        resolve(result.rows[0])
      }
    )
  })
}

module.exports = {
  addChat,
  conversations,
  oneConversations,
}
