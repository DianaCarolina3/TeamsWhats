require('dotenv').config()

module.exports = {
  remoteDB: process.env.REMOTE_DB || false,
  postgresql: {
    pghost: process.env.PG_HOST || 'localhost',
    pguser: process.env.PG_USER,
    pgpass: process.env.PG_PASSWORD,
    pgdatabase: process.env.PG_DATABASE,
    pgport: process.env.PG_PORT,
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
  cache_redis: {
    redishost: process.env.REDIS_HOST,
    redisport: process.env.REDIS_PORT,
    redispass: process.env.REDIS_PASSWORD,
  },
  auth_jwt: {
    secret: process.env.SECRET,
  },
}
