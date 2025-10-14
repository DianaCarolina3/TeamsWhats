//connecion a postgresql
const { Pool } = require('pg')
const config = require('../../config')

const configDB = {
  user: config.postgresql.user,
  host: config.postgresql.host,
  port: config.postgresql.port,
  password: config.postgresql.password,
  database: config.postgresql.database,
}

const pool = new Pool(configDB)

// verifica y desconecta la conexión si no es válida de lo contrario la conneta
function handleConnection() {
  // inicio connecion
  pool
    .connect()
    .then((client) => {
      console.log('[DB Connected] Successfully connected to PostgreSQL')
      client.release()
    })
    .catch((err) => {
      console.error('[Error DB Connection]: ', err.message)
      setTimeout(handleConnection, 2000)
    })

  pool.on('error', (err) => {
    console.error('[DB Error]: ', err.message)
  })
}
handleConnection()

module.exports = pool
