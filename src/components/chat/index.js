const buildChatController = require('./controller_chat')
const {store, cache} = require('../../config/dependencies')

const chatController = buildChatController(store, cache)

module.exports = chatController
