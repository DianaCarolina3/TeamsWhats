//crear las rutas y funciones con las tablas de mySQL
const express = require('express')

const response = require('../res/response')
const Store = require('../db/postgreSQL')

const router = express.Router()

//ROUTER
router.get('/:table', list)
router.get('/:table/:id', get)
router.post('/:table', upsert)
router.post('/:table/:id', upsertID)
router.put('/:table', upsert)
router.put('/:table/:id', upsertID)
router.delete('/:table/:id', remove)
router.post('/:table/query', query)

//LIST
async function list(req, res, next) {
  const data = await Store.list(req.params.table)
  response.success(req, res, data, 200)
  next()
}
//GET
async function get(req, res, next) {
  const data = await Store.get(req.params.table, req.params.id)
  response.success(req, res, data, 200)
  next()
}
//POST
//PUT
async function upsert(req, res, next) {
  const data = await Store.upsert(req.params.table, req.body)
  response.success(req, res, data, 200)
  next()
}
async function upsertID(req, res, next) {
  const data = await Store.upsert(req.params.table, req.params.id, req.body)
  response.success(req, res, data, 200)
  next()
}
//DELETE
async function remove(req, res, next) {
  const data = await Store.remove(req.params.table, req.params.id)
  response.success(req, res, data, 200)
  next()
}

async function query(req, res, next) {
  const data = await Store.remove(req.params.table, req.body.query)
  response.success(req, res, data, 200)
  next()
}

module.exports = router
