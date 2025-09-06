//connect microservice mysql-service
const createRemoteDB = require('./index')
const config = require('../../config')

const host = config.mysql.host
const port = config.mysql.port

const remote = new createRemoteDB(host, port)

module.exports = remote
