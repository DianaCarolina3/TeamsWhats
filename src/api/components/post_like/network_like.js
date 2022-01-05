const express = require('express')

const checkAuth = require('./secure')
const controller = require('./index')

const router = express.Router()

//ROUTER
router.get('/', list)
router.get('/:userID', getPost)
router.post('/', checkAuth('like'), like)
router.delete('/:idPost', checkAuth('delete'), remove)

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

async function getPost(req, res, next) {
  try {
    const data = await controller.getPost(req.params.userID)

    res.status(200).json({
      error: false,
      body: data,
    })
    next()
  } catch (error) {
    next(error)
  }
}

async function like(req, res, next) {
  try {
    const data = await controller.like(req.user, req.body)

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
    await controller.remove(req.params.idPost)

    res.status(200).json({
      error: false,
      body: `like of post ${req.params.idPost} removed`,
    })
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = router
