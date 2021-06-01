const TABLE = 'post_like'
const error = require('../../../utils/error')

module.exports = function (injectorStore) {
  let store = injectorStore
  if (!store) {
    store = require('../../../db/postgreSQL')
  }
  const list = async () => {
    let data = await store.list(TABLE)
    return data
  }

  const getPost = async (id) => {
    if (!id) {
      throw error('Invalid id', 404)
    }

    return await store.getPost(id)
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
