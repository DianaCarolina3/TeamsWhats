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

const remove = async (table, id) => {
  if (!id) {
    return '[Error] No id'
  }

  const collection = await list(table)
  const user = collection.filter((item) => item.id === id)[0] || null

  if (user.id === id) {
    // delete `"eliminado"`
  } else {
    return 'error'
  }
}

const query = async (table, q) => {
  let collection = await list(table)
  let keys = Object.keys(q)
  let key = keys[0]
  return collection.filter((item) => item[key] === q[key])[0] || null
}

module.exports = {
  list,
  get,
  upsert,
  remove,
  query,
}
