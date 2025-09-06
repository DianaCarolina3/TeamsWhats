//connect microservice cache-service
const createRemoteDB = require('./index')
const config = require('../../config')

const host = config.cache.host
const port = config.cache.port

const remote = new createRemoteDB(host, port)

module.exports = remote
