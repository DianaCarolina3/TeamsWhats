const buildUserController = require('./user.service')
const { store, cache } = require('../../config/dependencies')

const userController = buildUserController(store, cache)

module.exports = userController
