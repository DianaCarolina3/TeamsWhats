const TABLE = 'chat'
const { nanoid } = require('nanoid')

module.exports = function (injectorStore) {
  let store = injectorStore
  if (!store) {
    store = require('../../../db/postgreSQL')
  }

  const list = async () => {
    return await store.list(TABLE)
  }

  const conversations = async (id) => {
    return await store.conversations(id)
  }

  const addChat = async (users_from, users_to) => {
    let data = {
      id: nanoid(),
      users_from: users_from.id,
      users_to: users_to,
    }

    return await store.addChat(TABLE, data).then(() => data)
  }

  const deleteChat = async (id) => {
    return await store.remove(TABLE, id)
  }

  return {
    addChat,
    list,
    deleteChat,
    conversations,
  }
}
