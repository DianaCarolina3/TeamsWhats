//hace connexion con microservicio de mock-db-service
const createRemoteDB = require('./index')
const config = require('../../config')

const host = config.mock_db_service.host
const port = config.mock_db_service.port

const storeRemote = new createRemoteDB(host, port)

module.exports = storeRemote
