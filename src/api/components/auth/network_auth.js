const express = require('express')

const controller = require('./index')

const router = express.Router()

// ROUTER
router.post('/login', login)

function login(req, res, next) {
  controller
    .login(req.body.username, req.body.password)
    .then((data) => {
      res.status(200).send({ data: data })
    })
    .catch(next)
}

module.exports = router
