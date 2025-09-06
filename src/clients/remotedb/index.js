// migrar a axios, 'request' esta deprecated
const axios = require('axios')

class createRemoteDB {
  constructor(host, port) {
      this.URL = `http://${host}:${port}`
    }

    // request
    async req(method, table, data) {
      let url = `${this.URL}/${table}`
      // si es metodo GET y hay data: o sea parametros y querys
      if ((method === 'GET' || method === 'DELETE') && data) {
        url += '/' + data
      }

      try {
        // response
        const response = await axios({
          url: url,
          method: method,
          headers: { 'Content-Type': 'application/json'},
          // solo se pasa el body si NO es GET ni DELETE
          data: method !== 'GET' && method !== 'DELETE' ? data : undefined
        })
        return response.data
      } catch (err) {
        console.error('[ERROR] error with DB remote', err.message)
        // relanzar el error para que la función que llamo a req lo maneje
        throw err
      }
    }

  //FUNCTIONS
  list (table) {
    return this.req('GET', table)
  }
  get (table, id) {
    return this.req('GET', table, id)
  }
  upsert (table, data) {
    return this.req('POST' || 'PUT', table, data)
  }
  remove (table, id) {
    return this.req('DELETE', table, id)
  }
  query (table, query) {
    return this.req('POST' || 'PUT', table, query)
  }
  removeOneUser (id) {
    return this.req('DELETE', id)
  }
  getFollowing (id) {
    return this.req('GET', id)
  }
  getFollowers (id) {
    return this.req('GET', id)
  }
  Unfollowed (from, to) {
    return this.req('DELETE', from, to)
  }
  insertFollow (table, data) {
    return this.req('POST', table, data)
  }
  addPost (table, data) {
    return this.req('POST', table, data)
  }
  updatePost (table, data) {
    return this.req('PUT', table, data)
  }
  like (table, data) {
    return this.req('POST', table, data)
  }
  getPost (table, id) {
    return this.req('GET', table, id)
  }
  removePost (table, id) {
    return this.req('DELETE', table, id)
  }
  addChat (table, data) {
    return this.req('POST', table, data)
  }
  conversations () {
    return this.req('GET')
  }
  oneConversations (tabla, id) {
    return this.req('GET', tabla, id)
  }
  addMessage (table, data) {
    return this.req('POST', table, data)
  }
  updateMessage (table, data) {
    return this.req('PUT', table, data)
  }
  deleteMessage (table, id) {
    return this.req('DELETE', table, id)
  }
  getMessage (table, id) {
    return this.req('GET', table, id)
  }
}

module.exports = createRemoteDB