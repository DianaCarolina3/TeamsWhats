const express = require('express')

const swaggerUI = require('swagger-ui-express')
const swaggerDocument = require('../swagger.json')

const config = require('./config')
const router = require('./routes/router')
const path = require('path')

// Server
const app = express()

//Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Static File
app.use('/TeamsWhats', express.static(path.join(__dirname, 'public')))

//Documentation
app.use(
  '/TeamsWhats/api-docs',
  swaggerUI.serve,
  swaggerUI.setup(swaggerDocument)
)

router(app)

//Redirect
app.use((req, res) => {
  res.redirect(301, '/TeamsWhats')
})

app.listen(config.api.port, () => {
  console.log(`Server api TeamsWhats listen to port ${config.api.port}`)
})
