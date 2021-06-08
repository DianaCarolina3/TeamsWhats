//connect microservice cache
const remote = require('./remote')
const config = require('../config/config')

const host = config.cache.host
const port = config.cache.port

module.exports = new remote(host, port)
