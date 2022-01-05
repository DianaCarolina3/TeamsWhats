const TABLE = 'message'
const { nanoid } = require('nanoid')

module.exports = function (injectorStore, injectorCache) {
  let store = injectorStore
  let cache = injectorCache

  if (!store) {
    store = require('../../../db/testing/alternatedb')
  }
  if (!cache) {
    cache = require('../../../db/testing/alternatedb')
  }

  const list = async () => {
    let data = await cache.list(TABLE)

    if (!data) {
      data = await store.list(TABLE)
      cache.upsert(TABLE, data)
    }

    return data
  }

  const getMessage = async (id) => {
    let data = await cache.get(TABLE, id)

    if (!data) {
      data = await store.getMessage(TABLE, id)
      cache.upsert(TABLE, data)
    }

    return data
  }

  const addMessage = async (user, body, idChat) => {
    let message = {
      id_message: nanoid(),
      chat: idChat,
      date: new Date(),
      username: user.id,
      user_name: user.username,
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
      user_name: user.username,
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
