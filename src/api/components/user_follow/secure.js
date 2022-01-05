const AUTH = require('../../../Auth')

module.exports = function checkAuth(action) {
  function middleware(req, res, next) {
    switch (action) {
      case 'follow':
      case 'unfollowed':
        //auth for token
        AUTH.check.proper(req)
        next()
        break

      default:
        next()
    }
  }

  return middleware
}
