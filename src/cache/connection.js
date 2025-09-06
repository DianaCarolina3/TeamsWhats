const redis = require('redis')
const config = require('../config/index.js')

const client =  redis.createClient({
  url: `redis://default:${config.cache_redis.password}@${config.cache_redis.host}:${config.cache_redis.port}`

})

async function handleConnectionRedis() {
  client.on('error', (err) => {
    console.error('Redis Client Error', err.message)
  })

  try {
    await client.connect()
    console.log('[Cache Connected] Successfully connected to Redis')
  } catch (err) {
    console.error('Error connecting to redis', err.message)
  }
}

handleConnectionRedis()

module.exports =  client
