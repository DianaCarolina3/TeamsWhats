const express = require('express')

const checkAuth = require('./secure')
const controller = require('./index')
const response = require('../../../res/response')

const router = express.Router()

// ROUTER
router.get('/', list)
router.get('/:id', get)
router.post('/', checkAuth('post'), addPost)
router.put('/', checkAuth('update'), updatePost)
router.delete('/:id', checkAuth('delete'), deletePost)

function list(req, res, next) {
  controller
    .list()
    .then((data) => {
      response.success(req, res, data, 200)
    })
    .catch(next)
}

function get(req, res, next) {
  controller
    .get(req.params.id)
    .then((data) => {
      response.success(req, res, data, 200)
    })
    .catch(next)
}

function addPost(req, res, next) {
  controller
    .addPost(req.user, req.body)
    .then((data) => {
      response.success(req, res, data, 201)
    })
    .catch(next)
}

function updatePost(req, res, next) {
  controller
    .updatePost(req.body)
    .then((data) => {
      response.success(req, res, data, 201)
    })
    .catch(next)
}

function deletePost(req, res, next) {
  controller
    .deletePost(req.params.id)
    .then(() => {
      response.success(req, res, `post ${req.params.id} removed`, 200)
    })
    .catch(next)
}

module.exports = router
