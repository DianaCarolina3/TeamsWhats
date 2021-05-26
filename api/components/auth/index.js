const store = require('../../../db/dummy')
const controller = require('./controller_auth')

module.exports = controller(store)
