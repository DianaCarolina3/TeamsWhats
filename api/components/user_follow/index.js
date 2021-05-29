const store = require('../../../db/postgreSQL')
const controller = require('./controller_follow')

module.exports = controller(store)
