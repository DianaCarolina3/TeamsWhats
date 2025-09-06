const config = require('./index')

let store, cache

if (config.remoteDB === true) {
  store = require('../clients/remotedb/mysql-client')
  cache = require('../clients/remotedb/cache-client')
} else {
  store = require('../db/postgresql/postgresql_repo_index')
  cache = require('../cache/redis')
}

module.exports = {store, cache}