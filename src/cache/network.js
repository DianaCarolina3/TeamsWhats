const express = require('express')

const response = require('../res/response')
const Store = require('../db/cache_redis/redis')

const router = express.Router()

//ROUTER
router.get('/:table', list)
router.get('/:table/:id', get)
router.put('/:table', upsert)

async function list(req, res, next) {
  const data = await Store.list(req.params.table)
  response.success(req, res, data, 200)
  next()
}

async function get(req, res, next) {
  const data = await Store.get(req.params.table, req.params.id)
  response.success(req, res, data, 200)
  next()
}

async function upsert(req, res, next) {
  const data = await Store.upsert(req.params.table, req.body)
  response.success(req, res, data, 200)
  next()
}

module.exports = router
