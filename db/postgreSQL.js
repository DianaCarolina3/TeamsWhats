const { Pool } = require('pg')
const config = require('../config/config')
require('dotenv').config({ path: '.env' })

const configDB = {
  user: process.env.PGUSER,
  host: config.db.pghost,
  port: process.env.PGPORT,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
}

const pool = new Pool(configDB)

// verifica y desconecta la conexión si no es válida o la conneta
function handleConnection() {
  // inicio connecion
  pool.connect((err) => {
    if (err) {
      console.error('[error connection]', err)
      setTimeout(handleConnection, 1000)
    } else {
      console.log('[DB connect]')
    }
  })

  // durante connecion
  pool.on('error', (err) => {
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      handleConnection
    } else {
      //cierra connecion con el cliente
      pool.end()
      throw err
    }
  })
}
handleConnection()

const list = (table) => {
  return new Promise((resolve, reject) => {
    pool.query(`SELECT * FROM "${table}" ORDER BY id ASC `, (err, result) => {
      if (err) return reject(err)
      resolve(result.rows)
    })
  })
}

const get = (table, id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT * FROM "${table}" WHERE id = $1`,
      [id],
      (err, result) => {
        if (err) return reject(err)
        resolve(result.rows[0])
      }
    )
  })
}

const insert = (table, data) => {
  return new Promise((resolve, reject) => {
    let id = data.id
    let name = data.name
    let username = data.username
    let password = data.password

    if (data.password) {
      pool.query(
        `INSERT INTO "${table}"(
          id, name, username, password) VALUES ($1, $2, $3, $4)`,
        [id, name, username, password],
        (err, result) => {
          if (err) return reject(err)
          resolve(result.rows[0])
        }
      )
    } else {
      pool.query(
        `INSERT INTO "${table}"(
          id, name, username) VALUES ($1, $2, $3)`,
        [id, name, username],
        (err, result) => {
          if (err) return reject(err)
          resolve(result.rows[0])
        }
      )
    }
  })
}

const update = (table, data) => {
  return new Promise((resolve, reject) => {
    let id = data.id
    let name = data.name
    let username = data.username
    let password = data.password

    if (data.password) {
      pool.query(
        `UPDATE "${table}" SET id=$1, name=$2, username=$3 password=$4 WHERE id=$1`,
        [id, name, username, password],
        (err, result) => {
          if (err) return reject(err)
          resolve(result)
        }
      )
    } else {
      pool.query(
        `UPDATE "${table}" SET id=$1, name=$2, username=$3 WHERE id=$1`,
        [id, name, username],
        (err, result) => {
          if (err) return reject(err)
          resolve(result)
        }
      )
    }
  })
}

const upsert = async (table, data) => {
  const row = await get(table, data.id)
  if (row) {
    return update(table, data)
  } else {
    return insert(table, data)
  }
}

const remove = (table, id) => {
  return new Promise((resolve, reject) => {
    pool.query(`DELETE FROM "${table}" WHERE id=$1`, [id], (err, result) => {
      if (err) return reject(err)
      resolve(result.rows[0])
    })
  })
}

// const query = (table, data) => {

// }

module.exports = {
  list,
  get,
  upsert,
  remove,
}
