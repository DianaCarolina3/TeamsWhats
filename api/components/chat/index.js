const store = require('../../../db/postgreSQL')
const controller = require('./controller_chat')

module.exports = controller(store)
