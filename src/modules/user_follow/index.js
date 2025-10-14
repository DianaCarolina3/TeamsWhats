const buildFollowController = require('./user_follow.service')
const { store, cache } = require('../../config/dependencies')

const followController = buildFollowController(store, cache)

module.exports = followController
