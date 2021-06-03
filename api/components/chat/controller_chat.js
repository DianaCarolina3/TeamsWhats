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

  const conversations = async () => {
    return await store.conversations()
  }

  const oneConversations = async (id) => {
    return await store.oneConversations(id)
  }

  const addChat = async (users_one, users_two) => {
    let data = {
      id: nanoid(),
      users_one: users_one.id,
      users_two: users_two,
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
    oneConversations,
  }
}
