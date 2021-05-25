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
      setTimeout(handleConnection, 2000)
    } else {
      console.log('[DB connect]')
    }
  })

  // durante connecion
  pool.on('error', (err) => {
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      handleConnection
    } else {
      throw err
    }
  })
}
handleConnection()

const getUser = () => {
  return new Promise((resolve, reject) => {
    pool.query(`SELECT * FROM "user"`, (err, result) => {
      if (err) return reject(err)
      resolve(result)
      //cierra connecion con el cliente
      pool.end()
      console.log(result.rows[0])
    })
  })
}

getUser()
// module.exports = {
//   getUser,
// }
