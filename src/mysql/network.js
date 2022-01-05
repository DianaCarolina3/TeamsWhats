//crear las rutas y funciones con las tablas de mySQL
const express = require('express')

const Store = require('../db/postgreSQL') // cambiar db por una alterna de my sql

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
  try {
    const data = await Store.list(req.params.table)
    res.status(200).json({
      error: false,
      body: data,
    })
    next()
  } catch (error) {
    next(error)
  }
}
//GET
async function get(req, res, next) {
  try {
    const data = await Store.get(req.params.table, req.params.id)
    res.status(200).json({
      error: false,
      body: data,
    })
    next()
  } catch (error) {
    next(error)
  }
}
//POST
//PUT
async function upsert(req, res, next) {
  try {
    const data = await Store.upsert(req.params.table, req.body)
    res.status(200).json({
      error: false,
      body: data,
    })
    next()
  } catch (error) {
    next(error)
  }
}
async function upsertID(req, res, next) {
  try {
    const data = await Store.upsert(req.params.table, req.params.id, req.body)
    res.status(200).json({
      error: false,
      body: data,
    })
    next()
  } catch (error) {
    next(error)
  }
}
//DELETE
async function remove(req, res, next) {
  try {
    const data = await Store.remove(req.params.table, req.params.id)
    res.status(200).json({
      error: false,
      body: data,
    })
    next()
  } catch (error) {
    next(error)
  }
}

async function query(req, res, next) {
  try {
    const data = await Store.remove(req.params.table, req.body.query)
    res.status(200).json({
      error: false,
      body: data,
    })
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = router
