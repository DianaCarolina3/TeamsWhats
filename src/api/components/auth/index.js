const store = require('../../../db/postgreSQL')
const controller = require('./controller_auth')

module.exports = controller(store)
