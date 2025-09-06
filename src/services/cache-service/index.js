//Servicio de cache-service
const express = require('express')

const router = require('./network')
const config = require('../../config')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//ROUTER
app.use('/', router)

app.listen(config.cache.port, () => {
  console.log(`Service of cache listen on the port: ${config.cache.port}`)
})
