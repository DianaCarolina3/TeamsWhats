const buildMessageController = require('./controller_message')
const {store, cache} = require('../../config/dependencies')

const messageController = buildMessageController(store, cache)

module.exports = messageController
