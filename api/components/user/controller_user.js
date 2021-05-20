const { v4: uuidv4 } = require('uuid')
const TABLE = 'user'

module.exports = function (injectorStore) {
  let store = injectorStore

  if (!store) {
    store = require('../../../db/dummy')
  }

  const list = async () => {
    return await store.list(TABLE)
  }

  const get = async (id) => {
    return await store.get(TABLE, id)
  }

  const upsert = async (body) => {
    let user = {
      id: body.id ? body.id : uuidv4(),
      name: body.name,
      username: body.username,
    }

    return store.upsert(TABLE, user)
  }

  return {
    list,
    get,
    upsert,
  }
}
