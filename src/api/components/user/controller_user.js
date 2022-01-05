const { nanoid } = require('nanoid')
const error = require('../../../utils/error')
// exportada del controlador del login para validacion de user y password
const auth = require('../auth/index')
const TABLE = 'users'

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

  const get = async (id) => {
    if (!id) {
      throw error('Id invalid', 400)
    }

    let data = await cache.get(TABLE, id)

    if (!data) {
      data = await store.get(TABLE, id)
      cache.upsert(TABLE, data)
      console.log('db')
    } else {
      console.log('cache')
    }

    return data
  }

  const upsert = async (body) => {
    let user = {
      id: body.id ? body.id : nanoid(body.id),
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

    return store.upsert(TABLE, user).then(() => user)
  }

  const remove = async (id) => {
    return store.removeOneUser(id)
  }

  return {
    list,
    get,
    upsert,
    remove,
  }
}
