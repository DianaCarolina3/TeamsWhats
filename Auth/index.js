const jwt = require('jsonwebtoken')
// const error = require('../utils/error')
require('dotenv').config({ path: '.env' })

const sign = (dataAuth) => {
  const data = JSON.parse(JSON.stringify(dataAuth))
  return jwt.sign(data, process.env.SECRET)
}

module.exports = {
  sign,
}
