const express = require('express')

const controller = require('./index')
const response = require('../../../res/response')

const router = express.Router()

// ROUTER
router.get('/', list)
router.get('/:id', get)
router.post('/', upsert)
router.put('/', upsert)
// router.delete('/:id', remove)

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
      response.success(req, res, data, 200)
    })
    .catch(next)
}

// function remove(req, res, next) {
//   controller
//     .remove(req.params.id)
//     .then(() => {
//       response.success(req, res, `user ${req.params.id} removed`, 200)
//     })
//     .catch(next)
// }

module.exports = router
