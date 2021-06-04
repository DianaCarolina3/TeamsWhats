//crear las rutas y funciones con las tablas de mySQL
const express = require('express')

const response = require('../res/response')
const store = require('../db/postgreSQL')

const router = express.Router()

//ROUTER
router.get('/:table', list)
router.get('/:table', conversations)

router.get('/:table/:id', get)
router.get('/:table/:id', getFollowers)
router.get('/:table/:id', getFollowing)
router.get('/:table/:id', getPost)
router.get('/:table/:id', getMessage)
router.get('/:table/:id', oneConversations)

router.post('/:table/', upsert)
router.post('/:table/', insertFollow)
router.post('/:table/', addPost)
router.post('/:table/', like)
router.post('/:table/', addChat)
router.post('/:table/', addMessage)

router.put('/:table/', upsert)
router.put('/:table/', updatePost)
router.put('/:table/', updateMessage)

router.delete('/:table/:id', remove)
router.delete('/:table/:id', removeOneUser)
router.delete('/:table/:id', Unfollowed)
router.delete('/:table/:id', removePost)
router.delete('/:table/:id', deleteMessage)

//LIST
async function list(req, res, next) {
  const data = await store.list(req.params.table)
  response.success(req, res, data, 200)
  next()
}
async function conversations(req, res, next) {
  const data = await store.conversations(req.params.table)
  response.success(req, res, data, 200)
  next()
}

//GET
async function get(req, res, next) {
  const data = await store.get(req.params.table, req.params.id)
  response.success(req, res, data, 200)
  next()
}
async function getFollowers(req, res, next) {
  const data = await store.getFollowers(req.params.table, req.params.id)
  response.success(req, res, data, 200)
  next()
}
async function getFollowing(req, res, next) {
  const data = await store.getFollowing(req.params.table, req.params.id)
  response.success(req, res, data, 200)
  next()
}
async function getPost(req, res, next) {
  const data = await store.getPost(req.params.table, req.params.id)
  response.success(req, res, data, 200)
  next()
}
async function getMessage(req, res, next) {
  const data = await store.getMessage(req.params.table, req.params.id)
  response.success(req, res, data, 200)
  next()
}
async function oneConversations(req, res, next) {
  const data = await store.oneConversations(req.params.table, req.params.id)
  response.success(req, res, data, 200)
  next()
}

//POST
async function upsert(req, res, next) {
  const data = await store.upsert(req.params.table, req.body)
  response.success(req, res, data, 200)
  next()
}
async function insertFollow(req, res, next) {
  const data = await store.insertFollow(req.params.table, req.body)
  response.success(req, res, data, 200)
  next()
}
async function addPost(req, res, next) {
  const data = await store.addPost(req.params.table, req.body)
  response.success(req, res, data, 200)
  next()
}
async function like(req, res, next) {
  const data = await store.like(req.params.table, req.body)
  response.success(req, res, data, 200)
  next()
}
async function addChat(req, res, next) {
  const data = await store.addChat(req.params.table, req.body)
  response.success(req, res, data, 200)
  next()
}
async function addMessage(req, res, next) {
  const data = await store.addMessage(req.params.table, req.body)
  response.success(req, res, data, 200)
  next()
}

//PUT
async function updatePost(req, res, next) {
  const data = await store.updatePost(req.params.table, req.body)
  response.success(req, res, data, 200)
  next()
}
async function updateMessage(req, res, next) {
  const data = await store.updateMessage(req.params.table, req.body)
  response.success(req, res, data, 200)
  next()
}

//DELETE
async function remove(req, res, next) {
  const data = await store.remove(req.params.table, req.params.id)
  response.success(req, res, data, 200)
  next()
}
async function removeOneUser(req, res, next) {
  const data = await store.removeOneUser(req.params.table, req.params.id)
  response.success(req, res, data, 200)
  next()
}
async function Unfollowed(req, res, next) {
  const data = await store.Unfollowed(req.params.table, req.params.id)
  response.success(req, res, data, 200)
  next()
}
async function removePost(req, res, next) {
  const data = await store.removePost(req.params.table, req.params.id)
  response.success(req, res, data, 200)
  next()
}
async function deleteMessage(req, res, next) {
  const data = await store.deleteMessage(req.params.table, req.params.id)
  response.success(req, res, data, 200)
  next()
}

module.exports = router
