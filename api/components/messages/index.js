const store = require('../../../db/postgreSQL')
const controller = require('./controller_message')

module.exports = controller(store)
