const TABLE = 'chat'
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

  const get = async (id) => {
    let data = await cache.get(TABLE, id)

    if (!data) {
      data = await store.get(TABLE, id)
      cache.upsert(TABLE, data)
    }

    return data
  }

  const oneChat = async (id) => {
    let data = await cache.get(TABLE, id)

    if (!data) {
      data = await store.oneChat(TABLE, id)
      if (!data || data.length === 0)
        throw error(`Chat conversation ${id} not have messages`, 404)
      cache.upsert(TABLE, data)
    }

    return data
  }

  const addChat = async (users_one, users_two) => {
    let data = {
      id: crypto.randomUUID(),
      users_one: users_one.user_id,
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
    oneChat,
    get,
  }
}
