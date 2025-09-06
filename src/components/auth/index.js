const buildAuthController = require('./controller_auth')
const {store} = require('../../config/dependencies')

const authController = buildAuthController(store)

module.exports = authController

