const express = require('express')

const checkAuth = require('./secure')
const controller = require('./index')

const router = express.Router()

// ROUTER
router.get('/', list)
router.get('/conversations', conversations)
router.get('/conversations/:id', oneConversations)
router.post('/:idTo', checkAuth('chat'), addChat)
router.delete('/delete/:idChat', checkAuth('chat'), deleteChat)

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

async function conversations(req, res, next) {
  try {
    const data = await controller.conversations()

    res.status(200).json({
      error: false,
      body: data,
    })
    next()
  } catch (error) {
    next(error)
  }
}

async function oneConversations(req, res, next) {
  try {
    const data = await controller.oneConversations(req.params.id)

    res.status(200).json({
      error: false,
      body: data,
    })
    next()
  } catch (error) {
    next(error)
  }
}

async function addChat(req, res, next) {
  try {
    const data = await controller.addChat(req.user, req.params.idTo)

    res.status(201).json({
      error: false,
      body: data,
    })
    next()
  } catch (error) {
    next(error)
  }
}

async function deleteChat(req, res, next) {
  try {
    await controller.deleteChat(req.params.idChat)

    res.status(200).json({
      error: false,
      body: `Deleted chat ${req.params.idChat}`,
    })
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = router
