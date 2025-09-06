const express = require('express')

const checkAuth = require('./secure')
const controller = require('./index')
const response = require('../../response')

const router = express.Router()

// ROUTER
router.get('/', list)
router.get('/:idPost', get)
router.post('/:id', checkAuth('post'), addPost)
router.put('/:id', checkAuth('update'), updatePost)
router.delete('/:idPost', checkAuth('delete'), deletePost)

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
    const data = await controller.get(req.params.idPost)

    return response.success(req, res, data, 200)
  } catch (error) {
    next(error)

    return response.error(req, res, error.message, 500, error.stack)
  }
}

async function addPost(req, res, next) {
  try {
    const data = await controller.addPost(req.user, req.body)

    return response.success(req, res, data, 201)
  } catch (error) {
    next(error)

    return response.error(req, res, error.message, 500, error.stack)
  }
}

async function updatePost(req, res, next) {
  try {
    const data = await controller.updatePost(req.body, req.params.id)

    return response.success(req, res, data, 201)
  } catch (error) {
    next(error)

    return response.error(req, res, error.message, 500, error.stack)
  }
}

async function deletePost(req, res, next) {
  try {
    await controller.deletePost(req.params.id)

    return response.success(req, res, `post ${req.params.idPost} removed`, 201)
  } catch (error) {
    next(error)

    return response.error(req, res, error.message, 500, error.stack)
  }
}

module.exports = router
