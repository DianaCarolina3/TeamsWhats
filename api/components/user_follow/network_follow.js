const express = require('express')

const checkAuth = require('./secure')
const controller = require('./index')
const response = require('../../../res/response')

const router = express.Router()

//ROUTER
router.get('/', list)
router.get('/following/:id', getFollowing)
router.get('/followers/:id', getFollowers)
router.post('/:id', checkAuth('follow'), follow)
router.delete('/unfollowed/:user_to_id', checkAuth('unfollowed'), Unfollowed)

function list(req, res, next) {
  controller
    .list()
    .then((data) => {
      response.success(req, res, data, 200)
    })
    .catch(next)
}

function getFollowing(req, res, next) {
  controller
    .getFollowing(req.params.id)
    .then((data) => {
      response.success(req, res, data, 200)
    })
    .catch(next)
}

function getFollowers(req, res, next) {
  controller
    .getFollowers(req.params.id)
    .then((data) => {
      response.success(req, res, data, 200)
    })
    .catch(next)
}

function follow(req, res, next) {
  controller
    .follow(req.user.id, req.params.id)
    .then((data) => {
      response.success(req, res, data, 201)
    })
    .catch(next)
}

function Unfollowed(req, res, next) {
  controller
    .Unfollowed(req.user.id, req.params.user_to_id)
    .then(() => {
      response.success(req, res, `Unfollowed to ${req.params.user_to_id}`, 200)
    })
    .catch(next)
}

module.exports = router
