//connecion a postgresql
const { Pool } = require('pg')
const config = require('../config/config')
require('dotenv').config({ path: '.env' })

const configDB = {
  user: process.env.PGUSER,
  host: config.postgresql.pghost,
  port: process.env.PGPORT,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
}

const pool = new Pool(configDB)

// verifica y desconecta la conexión si no es válida de lo contrario la conneta
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

module.exports = pool
