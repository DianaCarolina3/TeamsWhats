const express = require('express')

const checkAuth = require('./user.secure')
const controller = require('./index')
const response = require('../../response')

const router = express.Router()

// ROUTER
router.get('/', list)
router.get('/:id', get)
router.post('/', insert)
router.patch('/:id', checkAuth('update'), update)
router.delete('/:id', checkAuth('remove'), remove)

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
    const data = await controller.get(req.params.id)

    return response.success(req, res, data, 200)
  } catch (error) {
    next(error)
  }
}

async function insert(req, res, next) {
  try {
    const data = await controller.insert(req.body)

    return response.success(req, res, data, 201)
  } catch (error) {
    next(error)
  }
}

async function update(req, res, next) {
  try {
    const data = await controller.update(req.body, req.params.id)

    return response.success(req, res, data, 201)
  } catch (error) {
    next(error)
  }
}

async function remove(req, res, next) {
  try {
    await controller.remove(req.params.id)

    return response.success(req, res, `user ${req.params.id} removed`, 200)
  } catch (error) {
    next(error)
  }
}

module.exports = router
