const bcrypt = require('bcrypt')
const TABLE = 'auth'

module.exports = function (injectorStore) {
  let store = injectorStore

  if (!store) {
    store = injectorStore
  }

  // login de usuario
  // const login = async (username, password) => {
  //   const data = await query
  //   bcrypt.compare(password, data.password)
  // }

  //hashear contraseña y verificar username y name
  const upsert = async (data) => {
    const authClient = {
      id: data.id,
    }

    if (data.name) {
      authClient.name = data.name
    }
    if (data.username) {
      authClient.username = data.username
    }
    if (data.password) {
      //hashea la contraseña
      authClient.password = await bcrypt.hash(data.password, 5)
    }

    return store.upsert(TABLE, authClient)
  }

  return {
    upsert,
  }
}
