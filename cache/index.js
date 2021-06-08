//Servicio de cache
const express = require('express')

const router = require('./network')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//ROUTER
app.use('/', router)

require('dotenv').config({ path: '.env' })

app.listen(process.env.CACHE_PORT, () => {
  console.log(`Service of cache listen on the port: ${process.env.CACHE_PORT}`)
})
