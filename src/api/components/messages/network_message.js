const express = require('express')

const checkAuth = require('./secure')
const controller = require('./index')

const router = express.Router()

//ROUTER
router.get('/', list)
router.get('/:id', getMessage)
router.post('/:idChat', checkAuth('send'), addMessage)
router.put('/:idMessage', checkAuth('update'), updateMessage)
router.delete('/:idMessage', checkAuth('delete'), deleteMessage)

async function list(req, res, next) {
  try {
    const data = await controller.list()

    res.status(200).json({
      error: false,
      body: data,
    })
    next()
  } catch (error) {
    next(error)
  }
}

async function getMessage(req, res, next) {
  try {
    const data = await controller.get(req.params.id)

    res.status(200).json({
      error: false,
      body: data,
    })
    next()
  } catch (error) {
    next(error)
  }
}

async function addMessage(req, res, next) {
  try {
    const data = await controller.add(req.user, req.body, req.params.idChat)

    res.status(201).json({
      error: false,
      body: data,
    })
    next()
  } catch (error) {
    next(error)
  }
}

async function updateMessage(req, res, next) {
  try {
    const data = await controller.update(
      req.user,
      req.body,
      req.params.idMessage
    )

    res.status(201).json({
      error: false,
      body: data,
    })
    next()
  } catch (error) {
    next(error)
  }
}

async function deleteMessage(req, res, next) {
  try {
    await controller.delete(req.params.idMessage)

    res.status(200).json({
      error: false,
      body: `Message ${req.params.idMessage} removed`,
    })
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = router
