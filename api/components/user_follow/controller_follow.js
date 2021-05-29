const TABLE = 'user_follow'

module.exports = function (injectorStore) {
  let store = injectorStore
  if (!store) {
    store = require('../../../db/postgreSQL')
  }

  const list = async () => {
    return await store.list(TABLE)
  }

  const getFollowing = async (id) => {
    return await store.getFollowing(id)
  }

  const getFollowers = async (id) => {
    return await store.getFollowers(id)
  }

  const follow = async (from, to) => {
    const data = {
      user_from: from,
      user_to: to,
    }
    return await store.insertFollow(TABLE, data).then(() => data)
  }

  const Unfollowed = async (user_to_id) => {
    return await store.Unfollowed(user_to_id)
  }

  return {
    follow,
    list,
    getFollowing,
    getFollowers,
    Unfollowed,
  }
}
