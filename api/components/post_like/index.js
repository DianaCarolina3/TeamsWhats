const store = require('../../../db/postgreSQL')
const controller = require('./controller_like')

module.exports = controller(store)
