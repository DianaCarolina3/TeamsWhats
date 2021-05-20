const db = {
  user: [],
}

const list = async (table) => {
  return (await db[table]) || []
}

const get = async (table, id) => {
  let collection = await list(table)
  return collection.filter((item) => item.id === id)[0] || null
}

const upsert = async (table, data) => {
  if (!db[table]) {
    db[table] = []
  }

  db[table].push(data)
  return data
}

module.exports = {
  list,
  get,
  upsert,
}
