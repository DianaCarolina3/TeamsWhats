const buildPostLikeController = require('./post_like.service')
const { store, cache } = require('../../config/dependencies')

const postLikeController = buildPostLikeController(store, cache)

module.exports = postLikeController
