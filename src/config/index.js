require('dotenv').config()

module.exports = {
  api: {
    port: process.env.API_PORT || 4000,
    host: process.env.API_HOST || 'localhost',
  },
  postgresql: {
    host: process.env.PG_HOST || 'localhost',
    user: process.env.PG_USER,
    pass: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
    port: process.env.PG_PORT,
  },
  cache_redis: {
    user: process.env.REDIS_USER,
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD,
  },
  auth_jwt: {
    secret: process.env.SECRET,
  },
  remoteDB: process.env.REMOTE_DB || false,
  mysql: {
    port: process.env.MYSQL_PORT || 4001,
    host: process.env.MYSQL_HOST || 'localhost',
  },
  cache: {
    port: process.env.CACHE_PORT || 4002,
    host: process.env.CACHE_HOST || 'localhost',
  }
}
