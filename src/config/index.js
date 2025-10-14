require('dotenv').config({
  path: process.env.NODE_ENV === 'production' ? '.env.prod' : '.env.dev',
})

module.exports = {
  api: {
    port: process.env.API_PORT || 4000,
    host: process.env.API_HOST || 'localhost',
  },
  postgresql: {
    host: process.env.PG_HOST || 'localhost',
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
    port: process.env.PG_PORT,
    schema: process.env.PG_SCHEMA,
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
  remoteDB: process.env.REMOTE_DB === 'true' || false,
  mock_db_service: {
    host: process.env.MOCK_DB_SERVICE_HOST || 'localhost',
    port: process.env.MOCK_DB_SERVICE_PORT || 4002,
  },
}
