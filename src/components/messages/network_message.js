const express = require('express')

const checkAuth = require('./secure')
const controller = require('./index')
const response = require('../../response')

const router = express.Router()

//ROUTER
router.get('/', list)
router.get('/:id', getMessage)
router.post('/', checkAuth('send'), addMessage)
router.put('/', checkAuth('update'), updateMessage)
router.delete('/:idMessage', checkAuth('delete'), deleteMessage)

async function list(req, res, next) {
  try {
    const data = await controller.list()

    return response.success(req, res, data, 200)
  } catch (error) {
    next(error)

    return response.error(req, res, error.message, 500, error.stack)
  }
}

async function getMessage(req, res, next) {
  try {
    const data = await controller.get(req.params.id)

    return response.success(req, res, data, 200)
  } catch (error) {
    next(error)

    return response.error(req, res, error.message, 500, error.stack)
  }
}

async function addMessage(req, res, next) {
  try {
    const data = await controller.add(req.user, req.body, req.query)

    return response.success(req, res, data, 201)
  } catch (error) {
    next(error)

    return response.error(req, res, error.message, 500, error.stack)
  }
}

async function updateMessage(req, res, next) {
  try {
    const data = await controller.update(
      req.user,
      req.body,
      req.query
    )

    return response.success(req, res, data, 201)
  } catch (error) {
    next(error)

    return response.error(req, res, error.message, 500, error.stack)
  }
}

async function deleteMessage(req, res, next) {
  try {
    await controller.delete(req.params.idMessage)

    return response.success(
      req,
      res,
      `Message ${req.params.idMessage} removed`,
      200
    )
  } catch (error) {
    next(error)

    return response.error(req, res, error.message, 500, error.stack)
  }
}

module.exports = router
