const AUTH = require('../../Auth')

module.exports = function checkAuth(action) {
  function middleware(req, res, next) {
    switch (action) {
      case 'chat':
        AUTH.check.verifyToken(req)
        next()
        break

      default:
        next()
    }
  }

  return middleware
}
