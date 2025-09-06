const express = require('express')

const checkAuth = require('./secure')
const controller = require('./index')
const response = require('../../response')

const router = express.Router()

// ROUTER
router.get('/', list)
router.get('/conversations', conversations)
router.get('/conversations/:id', oneConversations)
router.post('/:idTo', checkAuth('chat'), addChat)
router.delete('/delete/:idChat', checkAuth('chat'), deleteChat)

async function list(req, res, next) {
  try {
    const data = await controller.list()

    return response.success(req, res, data, 200)
  } catch (error) {
    next(error)

    return response.error(req, res, error.message, 500, error.stack)
  }
}

async function conversations(req, res, next) {
  try {
    const data = await controller.conversations()

    return response.success(req, res, data, 200)
  } catch (error) {
    next(error)

    return response.error(req, res, error.message, 500, error.stack)
  }
}

async function oneConversations(req, res, next) {
  try {
    const data = await controller.oneConversations(req.params.id)

    return response.success(req, res, data, 200)
  } catch (error) {
    next(error)

    return response.error(req, res, error.message, 500, error.stack)
  }
}

async function addChat(req, res, next) {
  try {
    const data = await controller.addChat(req.user, req.params.idTo)

    return response.success(req, res, data, 201)
  } catch (error) {
    next(error)

    return response.error(req, res, error.message, 500, error.stack)
  }
}

async function deleteChat(req, res, next) {
  try {
    await controller.deleteChat(req.params.idChat)

    return response.success(req, res, `Deleted chat ${req.params.idChat}`, 200)
  } catch (error) {
    next(error)

    return response.error(req, res, error.message, 500, error.stack)
  }
}

module.exports = router
