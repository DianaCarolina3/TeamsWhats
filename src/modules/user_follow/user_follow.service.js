const error = require('../../utils/error')
const TABLE = 'user_follow'

module.exports = function (injectorStore, injectorCache) {
  let store = injectorStore
  let cache = injectorCache

  if (!store) {
    store = require('../../../mock-db-service/dummydb')
  }
  if (!cache) {
    cache = require('../../../mock-db-service/dummydb')
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
    if (from === to) {
      throw error('User cannot follow himself', 404)
    }

    const userIdExists = await store.userIdExists(TABLE, to)

    if (!userIdExists) {
      throw error(`User id ${to} does not exist`, 404)
    }

    const data = {
      user_from: from,
      user_to: to,
    }

    return await store.insertFollow(TABLE, data)
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
