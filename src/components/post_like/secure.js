/* eslint-disable no-case-declarations */
const AUTH = require('../../Auth')

module.exports = function checkAuth(action) {
  function middleware(req, res, next) {
    switch (action) {
      case 'like':
        const owner = req.body.like_from
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
