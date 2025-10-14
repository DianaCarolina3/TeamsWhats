const AUTH = require('../../Auth')
const { store } = require('../../config/dependencies')
const error = require('../../utils/error')

module.exports = function checkAuth(action) {
  async function middleware(req, res, next) {
    try {
      switch (action) {
        case 'deleteChat':
          await AUTH.check.verifyToken(req)

          // eslint-disable-next-line no-case-declarations
          const belongChat = await store.get('chat', req.params.idChat)
          if (!belongChat) {
            throw error('Chat does not exist', 400)
          }
          if (
            req.user.user_id !== (belongChat.users_one || belongChat.users_two)
          ) {
            throw error("You don't belong in this chat", 400)
          }
          next()
          break

        case 'addChat':
          await AUTH.check.verifyToken(req)
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
