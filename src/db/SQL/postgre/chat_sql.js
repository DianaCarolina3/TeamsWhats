const pool = require('../../../connection/connetSQL-posgre')

const conversations = () => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT * FROM chat, message WHERE message.chat = chat.id;`,
      (err, result) => {
        if (err) return reject(err)
        resolve(
          result.rows.map(
            ({
              users_one,
              users_two,
              id,
              id_message,
              chat,
              date,
              username,
              user_name,
              message,
              file,
            }) => {
              let data = {
                id: id,
                users_one: users_one,
                users_two: users_two,
                id_message: id_message,
                chat: chat,
                date: date,
                username: username,
                user_name: user_name,
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

const oneConversations = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT * FROM chat JOIN message ON (message.chat = chat.id) WHERE chat.id = $1`,
      [id],
      (err, result) => {
        if (err) return reject(err)
        resolve(
          result.rows.map(
            ({
              users_one,
              users_two,
              id,
              id_message,
              chat,
              date,
              username,
              user_name,
              message,
              file,
            }) => {
              let data = {
                id: id,
                users_one: users_one,
                users_two: users_two,
                id_message: id_message,
                chat: chat,
                date: date,
                username: username,
                user_name: user_name,
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
