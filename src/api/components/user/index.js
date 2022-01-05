let store
let cache
const config = require('../../../config/index')
const controller = require('./controller_user')

if (config.remoteDB === true) {
  store = require('../../../../db/remoteDB/remote_mysql')
  cache = require('../../../../db/remoteDB/remote_cache')
} else {
  store = require('../../../db/postgreSQL')
  cache = require('../../../db/cache_redis/redis')
}

module.exports = controller(store, cache)
