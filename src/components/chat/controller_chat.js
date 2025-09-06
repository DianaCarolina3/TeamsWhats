const TABLE = 'chat'

module.exports = function (injectorStore, injectorCache) {
  let store = injectorStore
  let cache = injectorCache

  if (!store) {
    store = require('../../test/db-dummy/dummydb')
  }
  if (!cache) {
    cache = require('../../test/db-dummy/dummydb')
  }

  const list = async () => {
    let data = await cache.list(TABLE)

    if (!data) {
      data = await store.list(TABLE)
      cache.upsert(TABLE, data)
    }

    return data
  }

  const conversations = async () => {
    let data = await cache.list(TABLE)

    if (!data) {
      data = await store.conversations(TABLE)
      cache.upsert(TABLE, data)
    }

    return data
  }

  const oneConversations = async (id) => {
    let data = await cache.get(TABLE, id)

    if (!data) {
      data = await store.oneConversations(TABLE, id)
      cache.upsert(TABLE, data)
    }

    return data
  }

  const addChat = async (users_one, users_two) => {
    let data = {
      id: crypto.randomUUID(),
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
