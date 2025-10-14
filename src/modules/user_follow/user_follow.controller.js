const express = require('express')

const checkAuth = require('./user_follow.secure')
const controller = require('./index')
const response = require('../../response')

const router = express.Router()

//ROUTER
router.get('/', list)
router.get('/following/:id', getFollowing)
router.get('/followers/:id', getFollowers)
router.post('/:id', checkAuth('follow'), follow)
router.delete('/unfollowed/:user_to_id', checkAuth('unfollowed'), Unfollowed)

async function list(req, res, next) {
  try {
    const data = await controller.list()

    return response.success(req, res, data, 200)
  } catch (error) {
    next(error)
  }
}

async function getFollowing(req, res, next) {
  try {
    const data = await controller.getFollowing(req.params.id)

    return response.success(req, res, data, 200)
  } catch (error) {
    next(error)
  }
}

async function getFollowers(req, res, next) {
  try {
    const data = await controller.getFollowers(req.params.id)

    return response.success(req, res, data, 200)
  } catch (error) {
    next(error)
  }
}

async function follow(req, res, next) {
  try {
    const data = await controller.follow(req.user.user_id, req.params.id)

    return response.success(req, res, data, 201)
  } catch (error) {
    next(error)
  }
}

async function Unfollowed(req, res, next) {
  try {
    const data = await controller.Unfollowed(
      req.user.user_id,
      req.params.user_to_id
    )

    return response.success(req, res, data, 200)
  } catch (error) {
    next(error)
  }
}

module.exports = router
