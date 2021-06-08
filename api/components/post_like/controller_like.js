const TABLE = 'post_like'
const error = require('../../../utils/error')

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

  const getPost = async (id) => {
    if (!id) {
      throw error('Invalid id', 404)
    }

    let data = await cache.get(TABLE, id)

    if (!data) {
      data = await store.getPost(id)
      cache.upsert(TABLE, data)
    }

    return data
  }

  const like = async (user, body) => {
    let data = {
      like_from_post: user.id,
      username: user.username,
      like_to_post: body.like_to_post,
    }

    return store.like(TABLE, data).then(() => data)
  }

  const remove = async (id) => {
    return store.removePost(TABLE, id)
  }

  return {
    list,
    getPost,
    like,
    remove,
  }
}
