const express = require('express')

const checkAuth = require('./secure')
const controller = require('./index')

const router = express.Router()

// ROUTER
router.get('/', list)
router.get('/:id', get)
router.post('/', checkAuth('post'), addPost)
router.put('/', checkAuth('update'), updatePost)
router.delete('/:id', checkAuth('delete'), deletePost)

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

async function addPost(req, res, next) {
  try {
    const data = await controller.addPost(req.user, req.body)

    res.status(201).json({
      error: false,
      body: data,
    })
    next()
  } catch (error) {
    next(error)
  }
}

async function updatePost(req, res, next) {
  try {
    const data = await controller.updatePost(req.body)

    res.status(201).json({
      error: false,
      body: data,
    })
    next()
  } catch (error) {
    next(error)
  }
}

async function deletePost(req, res, next) {
  try {
    await controller.deletePost(req.params.id)

    res.status(200).json({
      error: false,
      body: `post ${req.params.id} removed`,
    })
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = router
