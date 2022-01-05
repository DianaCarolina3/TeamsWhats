require('dotenv').config()

module.exports = {
  remoteDB: process.env.REMOTE_DB || false,
  postgresql: {
    pghost: process.env.PG_HOST || 'localhost',
  },
  api: {
    port: process.env.API_PORT || 4000,
    host: process.env.API_HOST || 'localhost',
  },
  mysql: {
    port: process.env.MYSQL_PORT || 4001,
    host: process.env.MYSQL_HOST || 'localhost',
  },
  cache: {
    port: process.env.CACHE_PORT || 4002,
    host: process.env.CACHE_HOST || 'localhost',
  },
}
