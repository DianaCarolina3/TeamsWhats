const error = require('../../utils/error')
const TABLE = 'post'

module.exports = function (injectorStore, injectorCache) {
  let store = injectorStore
  let cache = injectorCache

  if (!store) {
    store = require('../../test/db-dummy/dummydb')
  }
  if (!cache) {
    cache = require('../../test/db-dummy/dummydb')
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
    if (!body.text || !body.image) {
      throw error('Text or Image is required', 400)
    }

    const dataPost = {
      id: crypto.randomUUID(),
      user_id: user.id,
      date: new Date().toISOString().slice(0, 16),
      text: body.text,
      image: body.image,
    }

    return await store.addPost(TABLE, dataPost).then(() => dataPost)
  }

  const updatePost = async (body, id) => {
    if (!body.text || !body.image) {
      throw error('Text or Image is required', 400)
    }

    let dataPost = {
      id: body.id,
      user_id: id,
      date: new Date(),
      text: body.text,
      image: body.image,
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
