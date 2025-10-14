const AUTH = require('../../Auth')

module.exports = function checkAuth(action) {
  async function middleware(req, res, next) {
    try {
      switch (action) {
        case 'follow':
        case 'unfollowed':
          //auth for token
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
