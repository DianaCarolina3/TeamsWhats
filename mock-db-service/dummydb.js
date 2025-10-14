const db = {}
db.users = [{ id: '1', name: 'Usuario de prueba', username: 'test' }]

const list = (table) => {
  return db[table] || []
}

const get = async (table, id) => {
  const item = db[table].find((item) => item.id === id)
  if (item) {
    return item
  }
}

const insert = async (table, data) => {
  if (!db[table]) {
    db[table] = []
  }

  return db[table].push(data)
}

const update = async (table, data, id) => {
  if (!db[table]) {
    db[table] = []
  }

  const collection = list(table)
  const index = collection.findIndex((item) => item.id === id)
  if (index === -1) {
    return 'error id not found'
  }

  return {
    ...collection[index],
    ...data,
  }
}

const remove = async (table, id) => {
  if (!id) {
    return '[Error] No id'
  }

  const collection = list(table)
  const index = collection.findIndex((item) => item.id === id)
  if (index === -1) {
    return 'error id not found'
  }

  db[table].splice(index, 1)

  return `${id} deleted`
}

module.exports = {
  list,
  get,
  insert,
  update,
  remove,
}
