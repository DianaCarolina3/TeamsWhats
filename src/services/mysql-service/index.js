//servicio de mySQL conectado en microservicio, base de datos como una sola api http
const express = require('express')

const config = require('../../config')
const router = require('./network')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//ROUTES
app.use('/', router)

app.listen(config.mysql.port, () => {
  console.log(`Servive of my SQL listen on ${config.mysql.port}`)
})
