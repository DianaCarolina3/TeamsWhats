const buildMessageController = require('./message.service')
const { store, cache } = require('../../config/dependencies')

const messageController = buildMessageController(store, cache)

module.exports = messageController
