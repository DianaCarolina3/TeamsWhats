const buildFollowController = require('./controller_follow')
const {store, cache} = require('../../config/dependencies')

const followController = buildFollowController(store, cache)

module.exports = followController
