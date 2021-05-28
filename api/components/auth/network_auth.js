const express = require('express')

const controller = require('./index')
const response = require('../../../res/response')

const router = express.Router()

// ROUTER
router.post('/login', login)

function login(req, res, next) {
  controller
    .login(req.body.username, req.body.password)
    .then((data) => {
      response.success(req, res, data, 200)
    })
    .catch(next)
}

module.exports = router
