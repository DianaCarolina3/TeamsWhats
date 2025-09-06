const error = require('../../utils/error')
// exportada del controlador del login para validacion de user y password
const auth = require('../auth')
const TABLE = 'users'

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

    if (!data || data.length === 0) {
      data = await store.list(TABLE)
      await cache.upsert(TABLE, data)
    }

    return data
  }

  const get = async (id) => {
    if (!id) {
      throw error('Id invalid', 400)
    }

    let data = await cache.get(TABLE, id)

    if (!data || data.length === 0) {
      data = await store.get(TABLE, id)
      await cache.upsert(TABLE, data)
    }

    return data
  }

  const upsert = async (body, id) => {
    let user = {
      id: id || crypto.randomUUID(),
      name: body.name,
      username: body.username,
    }

    //se autentifica la informacion y se almacena al agregar y editar usuario
    if (body.username || body.password) {
      await auth.upsert({
        id: user.id,
        username: user.username,
        password: body.password,
      })
    }

    return await store.upsert(TABLE, user).then(() => user)
  }

  const remove = async (id) => {
    return await store.removeOneUser(id)
  }

  return {
    list,
    get,
    upsert,
    remove,
  }
}
