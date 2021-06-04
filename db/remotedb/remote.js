/* eslint-disable no-unused-vars */
const request = require('request')

module.exports = class createRemoteDB {
  constructor(host, port) {
    const URL = `http://${host}:${port}`

    //FUNCTIONS

    const list = (table) => {
      return req('GET', table)
    }
    //no utils
    const get = (table, id) => {
      return req('GET', table, id)
    }
    const upsert = (table, data) => {
      if (data.id) {
        return req('PUT', table, data)
      } else {
        return req('POST', table, data)
      }
    }
    const query = (table, query) => {
      return req('POST', table, query)
    }
    const remove = (table, id) => {
      return req('DELETE', table, id)
    }

    //LA REQUEST
    const req = (method, table, data) => {
      let url = `${URL}/${table}`
      let body = ''

      return new Promise((resolve, reject) => {
        request(
          {
            method,
            headers: {
              'content-type': 'application/json',
            },
            url,
            body,
          },
          (err, req, body) => {
            if (err) {
              console.log('[ERROR] error whit DB remote', err)
              return reject(err.message)
            }

            const result = JSON.parse(body)
            return resolve(result.body)
          }
        )
      })
    }

    return {
      list,
      get,
      upsert,
      remove,
      query,
    }
  }
}

// module.exports = createRemoteDB
