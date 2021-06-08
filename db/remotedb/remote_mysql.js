//connect microservice db
const remote = require('./remote')
const config = require('../../config/config')

const host = config.mysql.host
const port = config.mysql.port

module.exports = new remote(host, port)
