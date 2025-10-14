const config = require('./index')

let store, cache

if (config.remoteDB === true) {
  try {
    console.log(
      '[DB Remote Connected] Successfully connected to mock db client'
    )
    store = require('../clients/mock_db_client')
  } catch (err) {
    console.error(
      '[Error DB Connection] Error in server mock db client:',
      err.message
    )
  }
} else {
  store = require('../db/postgresql/postgresql_repo_index')
  cache = require('../cache/redis')
}

module.exports = { store, cache }
