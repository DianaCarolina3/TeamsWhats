const { nanoid } = require('nanoid')
const TABLE = 'post'

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
    let data = await cache.get(TABLE, id)

    if (!data) {
      data = await store.get(TABLE, id)
      cache.upsert(TABLE, data)
    }

    return data
  }

  const addPost = async (user, body) => {
    const dataPost = {
      id: body.id ? body.id : nanoid(body.id),
      date: new Date().toISOString().slice(0, 16),
      username: user.username,
      text: body.text,
      image: body.image,
    }

    return await store.addPost(TABLE, dataPost).then(() => dataPost)
  }

  const updatePost = async (data) => {
    let dataPost = {
      id: data.id,
      date: new Date(),
      text: data.text,
      image: data.image,
    }

    return store.updatePost(TABLE, dataPost).then(() => dataPost)
  }

  const deletePost = async (id) => {
    return await store.remove(TABLE, id)
  }

  return {
    list,
    get,
    addPost,
    updatePost,
    deletePost,
  }
}
