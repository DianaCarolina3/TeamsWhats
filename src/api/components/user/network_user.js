const express = require('express')

const checkAuth = require('./secure')
const controller = require('./index')

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

    res.status(200).json({
      error: false,
      body: data,
    })
    next()
  } catch (error) {
    next(error)
  }
}

async function get(req, res, next) {
  try {
    const data = await controller.get(req.params.id)

    res.status(200).json({
      error: false,
      body: data,
    })
    next()
  } catch (error) {
    next(error)
  }
}

async function upsert(req, res, next) {
  try {
    const data = await controller.upsert(req.body)

    res.status(201).json({
      error: false,
      body: data,
    })
    next()
  } catch (error) {
    next(error)
  }
}

async function remove(req, res, next) {
  try {
    await controller.remove(req.params.id)

    res.status(200).json({
      error: false,
      body: `user ${req.params.id} removed`,
    })
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = router
