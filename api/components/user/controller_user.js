const { nanoid } = require('nanoid')
const error = require('../../../utils/error')
const auth = require('../auth/index')
const TABLE = 'users'

module.exports = function (injectorStore) {
  let store = injectorStore
  if (!store) {
    store = require('../../../db/dummy')
  }

  const list = async () => {
    let data = await store.list(TABLE)
    return data
  }

  const get = async (id) => {
    if (!id) {
      throw error('Id invalid', 400)
    }

    let data = await store.get(TABLE, id)
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
