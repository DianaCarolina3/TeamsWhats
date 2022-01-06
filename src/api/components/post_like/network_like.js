const express = require('express')

const checkAuth = require('./secure')
const controller = require('./index')
const response = require('../../../response')

const router = express.Router()

//ROUTER
router.get('/', list)
router.get('/:userID', getPost)
router.post('/', checkAuth('like'), like)
router.delete('/:idPost', checkAuth('delete'), remove)

async function list(req, res, next) {
  try {
    const data = await controller.list()

    return response.success(req, res, data, 200)
  } catch (error) {
    next(error)

    return response.error(req, res, error.message, 500, error.stack)
  }
}

async function getPost(req, res, next) {
  try {
    const data = await controller.getPost(req.params.userID)

    return response.success(req, res, data, 200)
  } catch (error) {
    next(error)

    return response.error(req, res, error.message, 500, error.stack)
  }
}

async function like(req, res, next) {
  try {
    const data = await controller.like(req.user, req.body)

    return response.success(req, res, data, 201)
  } catch (error) {
    next(error)

    return response.error(req, res, error.message, 500, error.stack)
  }
}

async function remove(req, res, next) {
  try {
    await controller.remove(req.params.idPost)

    return response.success(
      req,
      res,
      `like of post ${req.params.idPost} removed`,
      200
    )
  } catch (error) {
    next(error)

    return response.error(req, res, error.message, 500, error.stack)
  }
}

module.exports = router
