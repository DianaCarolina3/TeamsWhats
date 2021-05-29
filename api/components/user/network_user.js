const express = require('express')

const checkAuth = require('./secure')
const controller = require('./index')
const response = require('../../../res/response')

const router = express.Router()

// ROUTER
router.get('/', list)
router.get('/:id', get)
router.post('/', upsert)
router.put('/', checkAuth('update'), upsert)
router.delete('/:id', checkAuth('remove'), remove)

function list(req, res, next) {
  controller
    .list()
    .then((data) => {
      response.success(req, res, data, 200)
    })
    .catch(next)
}

function get(req, res, next) {
  controller
    .get(req.params.id)
    .then((data) => {
      response.success(req, res, data, 200)
    })
    .catch(next)
}

function upsert(req, res, next) {
  controller
    .upsert(req.body)
    .then((data) => {
      response.success(req, res, data, 201)
    })
    .catch(next)
}

function remove(req, res, next) {
  controller
    .remove(req.params.id)
    .then(() => {
      response.success(req, res, `user ${req.params.id} removed`, 200)
    })
    .catch(next)
}

module.exports = router
