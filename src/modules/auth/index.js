const buildAuthController = require('./auth.service')
const { store } = require('../../config/dependencies')

const authController = buildAuthController(store)

module.exports = authController
