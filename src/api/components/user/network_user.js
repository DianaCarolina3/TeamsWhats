const express = require('express')

const checkAuth = require('./secure')
const controller = require('./index')
const response = require('../../../response')

const router = express.Router()

// ROUTER
router.get('/', list)
router.get('/:id', get)
router.post('/', upsert)
router.put('/', checkAuth('update'), upsert)
router.delete('/:id', checkAuth('remove'), remove)

async function list(req, res, next) {
  try {
    const data = await controller.list()

    return response.success(req, res, data, 200)
  } catch (error) {
    next(error)

    return response.error(req, res, error.message, 500, error.stack)
  }
}

async function get(req, res, next) {
  try {
    const data = await controller.get(req.params.id)

    return response.success(req, res, data, 200)
  } catch (error) {
    next(error)

    return response.error(req, res, error.message, 500, error.stack)
  }
}

async function upsert(req, res, next) {
  try {
    const data = await controller.upsert(req.body)

    return response.success(req, res, data, 201)
  } catch (error) {
    next(error)

    return response.error(req, res, error.message, 500, error.stack)
  }
}

async function remove(req, res, next) {
  try {
    await controller.remove(req.params.id)

    return response.success(req, res, `user ${req.params.id} removed`, 200)
  } catch (error) {
    next(error)

    return response.error(req, res, error.message, 500, error.stack)
  }
}

module.exports = router
