/* eslint-disable no-unused-vars */
const request = require('request')
const { list } = require('../../api/components/user')

module.exports = class createRemoteDB {
  constructor(host, port) {
    const URL = `http://${host}:${port}`

    //FUNCTIONS

    const list = (table) => {
      return req('GET', table)
    }
    const get = (table, id) => {
      return req('GET', table, id)
    }
    const upsert = (table, data) => {
      return req('POST' || 'PUT', table, data)
    }
    const remove = (table, id) => {
      return req('DELETE', table, id)
    }
    const query = (table, query) => {
      return req('POST' || 'PUT', table, query)
    }
    const removeOneUser = (id) => {
      return req('DELETE', id)
    }
    const getFollowing = (id) => {
      return req('GET', id)
    }
    const getFollowers = (id) => {
      return req('GET', id)
    }
    const Unfollowed = (from, to) => {
      return req('DELETE', from, to)
    }
    const insertFollow = (table, data) => {
      return req('POST', table, data)
    }
    const addPost = (table, data) => {
      return req('POST', table, data)
    }
    const updatePost = (table, data) => {
      return req('PUT', table, data)
    }
    const like = (table, data) => {
      return req('POST', table, data)
    }
    const getPost = (id) => {
      return req('GET', id)
    }
    const removePost = (table, id) => {
      return req('DELETE', table, id)
    }
    const addChat = (table, data) => {
      return req('POST', table, data)
    }
    const conversations = () => {
      return req('GET')
    }
    const oneConversations = (id) => {
      return req('GET', id)
    }
    const addMessage = (table, data) => {
      return req('POST', table, data)
    }
    const updateMessage = (table, data) => {
      return req('PUT', table, data)
    }
    const deleteMessage = (table, id) => {
      return req('DELETE', table, id)
    }
    const getMessage = (table, id) => {
      return req('GET', table, id)
    }

    //LA REQUEST
    const req = (method, table, data) => {
      let url = `${URL}/${table}`
      let body = ''

      if (method === 'GET' && data) {
        url += '/' + data
      } else if (data) {
        body = JSON.stringify(data)
      }

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
      //user - auth - other
      list,
      get,
      remove,
      upsert,
      query,
      removeOneUser,
      //follow
      getFollowing,
      getFollowers,
      Unfollowed,
      insertFollow,
      //post
      addPost,
      updatePost,
      getPost,
      removePost,
      //chat
      addChat,
      conversations,
      oneConversations,
      //message
      addMessage,
      updateMessage,
      deleteMessage,
      getMessage,
      //post_like
      like,
    }
  }
}
