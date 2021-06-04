//microservice db
const remote = require('./remotedb/remote')
const config = require('../config/config')

module.exports = new remote(config.mysql.host, config.mysql.port)
