const store = require('../../../db/postgreSQL')
const controller = require('./controller_post')

module.exports = controller(store)
