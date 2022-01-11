//connecion a postgresql
const { Pool } = require('pg')
const config = require('../config')

const configDB = {
  user: config.postgresql.pguser,
  host: config.postgresql.pghost,
  port: config.postgresql.pgport,
  password: config.postgresql.pgpass,
  database: config.postgresql.pgdatabase,
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
      console.log('[DB connect] Connected successfully to postgreSQL')
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
