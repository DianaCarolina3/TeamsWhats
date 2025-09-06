/* eslint-disable no-case-declarations */
const AUTH = require('../../Auth')

module.exports = function checkAuth(action) {
  function middleware(req, res, next) {
    switch (action) {
      case 'post':
      case 'update':
        const owner = req.params.id
        AUTH.check.verifyOwnership(req, owner)
        next()
        break

      case 'delete':
        AUTH.check.verifyToken(req)
        next()
        break

      default:
        next()
    }
  }
  return middleware
}
