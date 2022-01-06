const express = require('express')

const Store = require('../db/cache_redis/redis')

const router = express.Router()

//ROUTER
router.get('/:table', list)
router.get('/:table/:id', get)
router.put('/:table', upsert)

async function list(req, res, next) {
  const data = await Store.list(req.params.table)
  res.status(200).json({
    data: data,
  })
  next()
}

async function get(req, res, next) {
  const data = await Store.get(req.params.table, req.params.id)
  res.status(200).json({
    data: data,
  })
  next()
}

async function upsert(req, res, next) {
  const data = await Store.upsert(req.params.table, req.body)
  res.status(200).json({
    data: data,
  })
  next()
}

module.exports = router
