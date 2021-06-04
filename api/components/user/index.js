// const store = require('../../../db/remote_mysql')
const store = require('../../../db/postgreSQL')
const controller = require('./controller_user')

module.exports = controller(store)
