//crear las rutas y funciones con las tablas de mySQL
const express = require('express')

const response = require('../res/response')
const store = require('../db/postgreSQL')

const router = express.Router()

//ROUTER
router.get('/:table', list) // = conversations
router.get('/:table/:id', get) // = getFollowers,getFollowing, getPost,getMessage
router.post('/:table/', upsert) // = insertFollow,addPost,like,addChat,addMessage,oneConversations
router.put('/:table/', upsert) // = updatePost,updateMessage
router.delete('/:table/:id', remove) // = removeOneUser, Unfollowed,removePost,deleteMessage

async function list(req, res, next) {
  const data = await store.list(req.params.table)
  response.success(req, res, data, 200)
  next()
}
async function get(req, res, next) {
  const data = await store.get(req.params.table, req.params.id)
  response.success(req, res, data, 200)
  next()
}
async function upsert(req, res, next) {
  const data = await store.upsert(req.params.table, req.body)
  response.success(req, res, data, 200)
  next()
}
async function remove(req, res, next) {
  const data = await store.remove(req.params.table, req.params.id)
  response.success(req, res, data, 200)
  next()
}

module.exports = router
