const buildPostController = require('./post.service')
const { store, cache } = require('../../config/dependencies')

const postController = buildPostController(store, cache)

module.exports = postController
