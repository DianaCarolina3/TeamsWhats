const express = require('express')

const checkAuth = require('./secure')
const controller = require('./index')
const response = require('../../../res/response')

const router = express.Router()

//ROUTER
router.get('/like', list) //f.list
router.get('/like/:userID', getPost)
router.post('/like', checkAuth('like'), like)
router.delete('/like/:idPost', checkAuth('delete'), remove)

function list(req, res, next) {
  controller
    .list()
    .then((data) => {
      response.success(req, res, data, 200)
    })
    .catch(next)
}

function getPost(req, res, next) {
  controller
    .getPost(req.params.userID)
    .then((data) => {
      response.success(req, res, data, 200)
    })
    .catch(next)
}

function like(req, res, next) {
  controller
    .like(req.user, req.body)
    .then((data) => {
      response.success(req, res, data, 201)
    })
    .catch(next)
}

function remove(req, res, next) {
  controller
    .remove(req.params.idPost)
    .then(() => {
      response.success(
        req,
        res,
        `like of post ${req.params.idPost} removed`,
        201
      )
    })
    .catch(next)
}

module.exports = router
