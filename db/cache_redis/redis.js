const redis = require('redis')

require('dotenv').config({ path: '.env' })

const client = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD,
})

async function list(table) {
  return new Promise((resolve, reject) => {
    client.get(table, (err, data) => {
      if (err) return reject(err)

      //key-value in Redis
      //string to object to reed db
      //object to string to save

      let response = data || null
      if (data) {
        response = JSON.parse(data)
      }

      resolve(response)
    })
  })
}

async function get(table, id) {
  let key = `${table}_${id}`
  return list(key)
}

async function upsert(table, data) {
  let key = table

  if (data && data.id) {
    key = `${key}_${data.id}`
  }

  await client.setex(key, 20, JSON.stringify(data))
  return true
}

module.exports = {
  list,
  get,
  upsert,
}
