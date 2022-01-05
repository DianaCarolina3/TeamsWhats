const express = require('express')

const checkAuth = require('./secure')
const controller = require('./index')

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

    res.status(200).json({
      error: false,
      body: data,
    })
    next()
  } catch (error) {
    next(error)
  }
}

async function getFollowing(req, res, next) {
  try {
    const data = await controller.getFollowing(req.params.id)

    res.status(200).json({
      error: false,
      body: data,
    })
    next()
  } catch (error) {
    next(error)
  }
}

async function getFollowers(req, res, next) {
  try {
    const data = await controller.getFollowers(req.params.id)

    res.status(200).json({
      error: false,
      body: data,
    })
    next()
  } catch (error) {
    next(error)
  }
}

async function follow(req, res, next) {
  try {
    const data = await controller.follow(req.user.id, req.params.id)

    res.status(201).json({
      error: false,
      body: data,
    })
    next()
  } catch (error) {
    next(error)
  }
}

async function Unfollowed(req, res, next) {
  try {
    await controller.Unfollowed(req.user.id, req.params.user_to_id)

    res.status(200).json({
      error: false,
      body: `Unfollowed to ${req.params.user_to_id}`,
    })
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = router
