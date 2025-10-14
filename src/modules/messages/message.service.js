const TABLE = 'message'
const error = require('../../utils/error')

module.exports = function (injectorStore, injectorCache) {
  let store = injectorStore
  let cache = injectorCache

  if (!store) {
    store = require('../../../mock-db-service/dummydb')
  }
  if (!cache) {
    cache = require('../../../mock-db-service/dummydb')
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
      if (!data || data.length === 0)
        throw error(`Message id ${id} not found`, 404)
      cache.upsert(TABLE, data)
    }

    return data
  }

  const addMessage = async (user, body, query) => {
    let message = {
      id_message: crypto.randomUUID(),
      chat_id: query.chat_id,
      sender_id: user.user_id,
      sender_name: user.username,
      message: body.message,
      file_url: body.file_url,
    }

    return await store.addMessage(TABLE, message).then(() => message)
  }

  const updateMessage = async (user, body, query) => {
    let updateMessage = {
      id_message: query.message_id,
      chat_id: query.chat_id,
      sender_id: user.user_id,
      sender_name: user.username,
      message: body.message,
      file_url: body.file_url,
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
