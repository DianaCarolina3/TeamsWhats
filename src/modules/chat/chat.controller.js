const express = require('express')

const checkAuth = require('./chat.secure')
const controller = require('./index')
const response = require('../../response')

const router = express.Router()

// ROUTER
router.get('/', list)
router.get('/:idChat', get)
router.get('/conversations/:id', oneChat)
router.post('/:idTo', checkAuth('addChat'), addChat)
router.delete('/delete/:idChat', checkAuth('deleteChat'), deleteChat)

async function list(req, res, next) {
  try {
    const data = await controller.list()

    return response.success(req, res, data, 200)
  } catch (error) {
    next(error)
  }
}

async function get(req, res, next) {
  try {
    const data = await controller.get(req.params.idChat)

    return response.success(req, res, data, 200)
  } catch (error) {
    next(error)
  }
}

async function oneChat(req, res, next) {
  try {
    const data = await controller.oneChat(req.params.id)

    return response.success(req, res, data, 200)
  } catch (error) {
    next(error)
  }
}

async function addChat(req, res, next) {
  try {
    const data = await controller.addChat(req.user, req.params.idTo)

    return response.success(req, res, data, 201)
  } catch (error) {
    next(error)
  }
}

async function deleteChat(req, res, next) {
  try {
    await controller.deleteChat(req.params.idChat)

    return response.success(req, res, `Deleted chat ${req.params.idChat}`, 200)
  } catch (error) {
    next(error)
  }
}

module.exports = router
