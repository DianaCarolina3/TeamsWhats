const error = require('../../utils/error')
// exportada del controlador del login para validacion de user y password
const auth = require('../auth')
const TABLE = 'users'

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

    if (!data || data.length === 0) {
      data = await store.list(TABLE)
      await cache.upsert(TABLE, data)
    }

    return data
  }

  const get = async (id) => {
    let data = await cache.get(TABLE, id)

    if (!data || data.length === 0) {
      data = await store.get(TABLE, id)
      if (data !== undefined) {
        await cache.upsert(TABLE, data)
      }
    }

    if (!data) {
      throw error('User not found', 404)
    }

    return data
  }

  const insert = async (body) => {
    let user = {
      id: crypto.randomUUID(),
      name: body.name,
      username: body.username,
    }

    const usernameExists = await store.usernameExists(TABLE, user.username)
    if (usernameExists) {
      throw error('Username exists', 409)
    }
    const result = await store.insertInUser(TABLE, user)

    //se autentifica la informacion y se almacena al agregar y editar usuario
    if (body.password) {
      await auth.insert({
        id: crypto.randomUUID(),
        user_id: user.id,
        username: body.username,
        password: body.password,
      })
    }

    return result
  }

  const update = async (body, idUser) => {
    let user = {}
    if (body.name && (body.name !== '' || body.name !== undefined))
      user.name = body.name
    if (body.username && (body.username !== '' || body.username !== undefined))
      user.username = body.username

    const usernameExists = await store.usernameExists(TABLE, user.username)
    if (usernameExists) {
      throw error('Username exists', 409)
    }
    const result = await store.updateInUser(TABLE, user, idUser)

    //se edita la password en auth
    let dataAuth = {}
    if (body.password && (body.password !== '' || body.password !== undefined))
      dataAuth.password = body.password
    if (body.username && (body.username !== '' || body.username !== undefined))
      dataAuth.username = body.username

    await auth.update(dataAuth, idUser)

    return result
  }

  const remove = async (id) => {
    return await store.removeOneUser(id)
  }

  return {
    list,
    get,
    insert,
    update,
    remove,
  }
}
