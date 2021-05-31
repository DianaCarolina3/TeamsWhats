const { nanoid } = require('nanoid')
const TABLE = 'post'

module.exports = function (injectorStore) {
  let store = injectorStore
  if (!store) {
    store = require('../../../db/postgreSQL')
  }

  const list = async () => {
    return await store.list(TABLE)
  }

  const get = async (id) => {
    return await store.get(TABLE, id)
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
