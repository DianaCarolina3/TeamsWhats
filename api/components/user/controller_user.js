const { nanoid } = require('nanoid')
const auth = require('../auth')
const TABLE = 'user'

module.exports = function (injectorStore) {
  let store = injectorStore

  if (!store) {
    store = require('../../../db/postgreSQL')
  }

  const list = async () => {
    return await store.list(TABLE)
  }

  const get = async (id) => {
    return await store.get(TABLE, id)
  }

  const upsert = async (body) => {
    let user = {
      id: body.id ? body.id : nanoid(20),
      name: body.name,
      username: body.username,
    }

    // autentificar username y hashear password
    if (body.password || body.username) {
      await auth.upsert({
        id: user.id,
        username: user.username,
        password: body.password,
      })
    }

    return store.upsert(TABLE, user).then(() => user)
  }

  const remove = async (id) => {
    return store.remove(TABLE, id)
  }

  return {
    list,
    get,
    upsert,
    remove,
  }
}
