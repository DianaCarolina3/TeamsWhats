const buildChatController = require('./chat.service')
const { store, cache } = require('../../config/dependencies')

const chatController = buildChatController(store, cache)

module.exports = chatController
