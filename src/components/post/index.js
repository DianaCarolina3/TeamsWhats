const buildPostController = require('./controller_post')
const {store, cache} = require('../../config/dependencies')

const postController = buildPostController(store, cache)

module.exports = postController
