const store = require('../../../db/dummy')
const controller = require('./controller_user')

module.exports = controller(store)
