//crear las rutas y funciones con las tablas de mySQL
const express = require('express')

const store = require('./dummydb') // agregar conexion a db en el microservicio

const router = express.Router()

//ROUTER
router.get('/:table', list)
router.get('/:table/:id', get)
router.post('/:table', insert)
router.put('/:table/:id', update)
router.delete('/:table/:id', remove)

//LIST
async function list(req, res, next) {
  try {
    const data = await store.list(req.params.table)
    res.status(200).json({
      ...data,
    })
  } catch (error) {
    console.error('[Error]: ', error)
    next(error)
  }
}
//GET
async function get(req, res, next) {
  try {
    const data = await store.get(req.params.table, req.params.id)
    res.status(200).json({
      ...data,
    })
  } catch (error) {
    console.error('[Error]: ', error)
    next(error)
  }
}
//POST
//PUT
async function insert(req, res, next) {
  try {
    const data = await store.insert(req.params.table, req.body)
    res.status(200).json({
      ...data,
    })
  } catch (error) {
    console.error('[Error]: ', error)
    next(error)
  }
}
async function update(req, res, next) {
  try {
    const data = await store.update(req.params.table, req.body, req.params.id)
    res.status(200).json({
      ...data,
    })
  } catch (error) {
    console.error('[Error]: ', error)
    next(error)
  }
}
//DELETE
async function remove(req, res, next) {
  try {
    const data = await store.remove(req.params.table, req.params.id)
    res.status(200).json({
      ...data,
    })
  } catch (error) {
    console.error('[Error]: ', error)
    next(error)
  }
}

module.exports = router
