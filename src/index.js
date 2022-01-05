const express = require('express')

const swaggerUI = require('swagger-ui-express')
const swaggerDocument = require('../swagger.json')

const config = require('./config')
const router = require('./routes/router')
const path = require('path')

// //Server
const app = express()

//Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/TeamsWhats', express.static(path.join(__dirname, 'public')))
app.use(
  '/TeamsWhats/api-docs',
  swaggerUI.serve,
  swaggerUI.setup(swaggerDocument)
)

router(app)

app.listen(config.api.port, () => {
  console.log(`Server api TeamsWhats listen to port ${config.api.port}`)
})
