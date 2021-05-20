const express = require('express')
const bodyParser = require('body-parser')

const config = require('../config/config')
const errors = require('../res/errors')
const router = require('../routes/router')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/net', express.static('public'))

router(app)

app.use(errors)

app.listen(config.api.port, () => {
  console.log(`Server api listen to port ${config.api.port}`)
})
