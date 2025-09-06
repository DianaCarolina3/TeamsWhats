const buildUserController = require('./controller_user')
const {store, cache} = require('../../config/dependencies')

const userController = buildUserController(store, cache)

module.exports = userController