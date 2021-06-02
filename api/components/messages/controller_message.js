const TABLE = 'message'
const { nanoid } = require('nanoid')

module.exports = function (injectorStore) {
  let store = injectorStore
  if (!store) {
    store = require('../../../db/postgreSQL')
  }

  const list = async () => {
    return await store.list(TABLE)
  }

  const getMessage = async (id) => {
    return await store.getMessage(TABLE, id)
  }

  const addMessage = async (user, body, idChat) => {
    let message = {
      id_message: nanoid(),
      chat: idChat,
      date: new Date(),
      username: user.id,
      user: user.username,
      message: body.message,
      file: body.file,
    }

    return await store.addMessage(TABLE, message).then(() => message)
  }

  const updateMessage = async (user, body, id_message) => {
    let updateMessage = {
      id_message: id_message,
      chat: body.chat,
      date: new Date(),
      username: user.id,
      user: user.username,
      message: body.message,
      file: body.file,
    }

    return await store
      .updateMessage(TABLE, updateMessage)
      .then(() => updateMessage)
  }

  const deleteMessage = async (id) => {
    return await store.deleteMessage(TABLE, id)
  }

  return {
    add: addMessage,
    list,
    update: updateMessage,
    delete: deleteMessage,
    get: getMessage,
  }
}
