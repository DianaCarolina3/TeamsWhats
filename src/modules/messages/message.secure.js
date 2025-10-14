/* eslint-disable no-case-declarations */
const AUTH = require('../../Auth')
const { store } = require('../../config/dependencies')
const error = require('../../utils/error')

module.exports = function checkAuth(action) {
  async function middleware(req, res, next) {
    try {
      switch (action) {
        case 'send':
        case 'update':
          const owner = req.query.user_id
          await AUTH.check.verifyOwnership(req, owner)
          next()
          break

        case 'delete':
          await AUTH.check.verifyToken(req)

          const verifyMessageInChat = await store.getMessage(
            'message',
            req.params.idMessage
          )
          if (!verifyMessageInChat) {
            throw error('Message does not exist', 404)
          }
          if (verifyMessageInChat.sender_id !== req.user.user_id) {
            throw error('You did not send this message', 401)
          }

          next()
          break

        default:
          next()
      }
    } catch (err) {
      next(err)
    }
  }

  return middleware
}
