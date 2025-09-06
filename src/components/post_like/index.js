const buildPostLikeController = require('./controller_like')
const {store, cache} = require('../../config/dependencies')

const postLikeController = buildPostLikeController(store, cache)

module.exports = postLikeController
