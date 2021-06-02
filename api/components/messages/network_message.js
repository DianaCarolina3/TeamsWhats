const express = require('express')

const checkAuth = require('./secure')
const controller = require('./index')
const response = require('../../../res/response')

const router = express.Router()

//ROUTER
router.get('/', list)
router.get('/:id', getMessage)
router.post('/:idChat', checkAuth('send'), addMessage)
router.put('/:idMessage', checkAuth('update'), updateMessage)
router.delete('/:idMessage', checkAuth('delete'), deleteMessage)

function list(req, res, next) {
  controller
    .list()
    .then((data) => {
      response.success(req, res, data, 200)
    })
    .catch(next)
}

function getMessage(req, res, next) {
  controller
    .get(req.params.id)
    .then((data) => {
      response.success(req, res, data, 200)
    })
    .catch(next)
}

function addMessage(req, res, next) {
  controller
    .add(req.user, req.body, req.params.idChat)
    .then((data) => {
      response.success(req, res, data, 201)
    })
    .catch(next)
}

function updateMessage(req, res, next) {
  controller
    .update(req.user, req.body, req.params.idMessage)
    .then((data) => {
      response.success(req, res, data, 201)
    })
    .catch(next)
}

function deleteMessage(req, res, next) {
  controller
    .delete(req.params.idMessage)
    .then(() => {
      response.success(req, res, `Message ${req.params.idMessage} removed`, 200)
    })
    .catch(next)
}

module.exports = router
