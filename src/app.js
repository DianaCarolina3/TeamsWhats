const express = require('express')

const swaggerUI = require('swagger-ui-express')
const swaggerDocument = require('../swagger.json')

const config = require('./config')
const router = require('./routes/router')
const path = require('path')
const { errorHandler } = require('./response')

// Server
const app = express()

// Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.disable('x-powered-by')

// Static File
app.use('/', express.static(path.join(__dirname, 'public')))

// Documentation
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument))

// Router app
router(app)

// Error Handler
app.use(errorHandler)

app.listen(config.api.port, () => {
  console.log(
    `Server api TeamsWhats listen to http://${config.api.host}:${config.api.port}`
  )
  console.log(`Running in ${process.env.NODE_ENV} mode`)
})
