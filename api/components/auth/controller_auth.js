const bcrypt = require('bcrypt')
const error = require('../../../utils/error')
const AUTH = require('../../../Auth')
const TABLE = 'auth'

module.exports = function (injectorStore) {
  let store = injectorStore
  if (!store) {
    store = require('../../../db/dummy')
  }

  const login = async (username, password) => {
    const data = await store.query(TABLE, { username: username })

    return bcrypt.compare(password, data.password).then((isSame) => {
      if (isSame === true) {
        return AUTH.sign(data)
      } else {
        throw error('Invalid password or username', 401)
      }
    })
  }

  const upsert = async (data) => {
    let authData = {
      id: data.id,
    }

    if (data.username) {
      authData.username = data.username
    }
    if (data.password) {
      authData.password = await bcrypt.hash(data.password, 5)
    }

    return store.upsert(TABLE, authData)
  }

  return {
    login,
    upsert,
  }
}
