const express = require('express')

const checkAuth = require('./secure')
const controller = require('./index')
const response = require('../../../res/response')

const router = express.Router()

// ROUTER
router.get('/', list)
router.get('/:id', getParams)
router.post('/:idTo', checkAuth('chat'), addChat)
router.delete('/delete/:idChat', checkAuth('chat'), deleteChat)

function list(req, res, next) {
  controller
    .list()
    .then((data) => {
      response.success(req, res, data, 200)
    })
    .catch(next)
}

function getParams(req, res, next) {
  controller
    .getParams(req.params.id)
    .then((data) => {
      response.success(req, res, data, 200)
    })
    .catch(next)
}

function addChat(req, res, next) {
  controller
    .addChat(req.user, req.params.idTo)
    .then((data) => {
      response.success(req, res, data, 201)
    })
    .catch(next)
}

function deleteChat(req, res, next) {
  controller
    .deleteChat(req.params.idChat)
    .then(() => {
      response.success(req, res, `chat id ${req.params.idChat} removed`, 200)
    })
    .catch(next)
}

module.exports = router
