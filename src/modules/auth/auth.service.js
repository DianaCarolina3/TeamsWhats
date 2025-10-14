const bcrypt = require('bcrypt')
const error = require('../../utils/error')
const AUTH = require('../../Auth')
const TABLE = 'auth'

module.exports = function (injectorStore) {
  let store = injectorStore
  if (!store) {
    store = require('../../../mock-db-service/dummydb')
  }

  const login = async (username, password) => {
    let userQuery = {
      username: username,
    }
    // data contiene id, username y password
    const data = await store.query(TABLE, userQuery)

    if (!data) {
      throw error('User does not exist or was deleted', 400)
    }

    //verificar que contrasena sea igual a la que viene de los datos
    return bcrypt.compare(password, data.password).then((isSame) => {
      if (isSame === true) {
        return AUTH.sign(data)
      } else {
        throw error('Invalid password or username', 401)
      }
    })
  }

  const insert = async (data) => {
    if (data.password) {
      const saltRounds = 10
      const salt = await bcrypt.genSalt(saltRounds)
      data.password = await bcrypt.hash(data.password, salt)
    }

    return store.insertInAuth(TABLE, data)
  }

  const update = async (data, idUser) => {
    if (data.password) {
      const saltRounds = 10
      const salt = await bcrypt.genSalt(saltRounds)
      data.password = await bcrypt.hash(data.password, salt)
    }

    return store.updateInAuth(TABLE, data, idUser)
  }

  return {
    login,
    insert,
    update,
  }
}
