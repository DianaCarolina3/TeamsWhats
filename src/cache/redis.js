const  client  = require('./connection')

async function upsert(table, data) {
  let key = table

  if (data && data.id) {
    key = `${key}_${data.id}`
  }

  await client.setEx(key, 20, JSON.stringify(data))
  return true
}

async function list (table) {
  let result = await client.get(table)
  return JSON.parse(result)
}

async function get (table, id) {
  let key = table

  if (id) {
    key = `${key}_${id}`
  }

  let result = await client.get(key)
  return JSON.parse(result)
}


module.exports = {
  list,
  get,
  upsert,
}
