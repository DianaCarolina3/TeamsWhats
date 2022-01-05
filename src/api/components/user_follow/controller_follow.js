const TABLE = 'user_follow'

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

  const getFollowing = async (id) => {
    let data = await cache.get(TABLE, id)

    if (!data) {
      data = await store.getFollowing(id)
      cache.upsert(TABLE, data)
    }

    return data
  }

  const getFollowers = async (id) => {
    let data = await cache.get(TABLE, id)

    if (!data) {
      data = await store.getFollowers(id)
      cache.upsert(TABLE, data)
    }

    return data
  }

  const follow = async (from, to) => {
    const data = {
      user_from: from,
      user_to: to,
    }
    return await store.insertFollow(TABLE, data).then(() => data)
  }

  const Unfollowed = async (user_from, user_to_id) => {
    return await store.Unfollowed(user_from, user_to_id)
  }

  return {
    follow,
    list,
    getFollowing,
    getFollowers,
    Unfollowed,
  }
}
