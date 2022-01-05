/* eslint-disable no-case-declarations */
const AUTH = require('../../../Auth')

module.exports = function checkAuth(action) {
  function middleware(req, res, next) {
    switch (action) {
      case 'send':
      case 'update':
        const owner = req.body.username
        AUTH.check.own(req, owner)
        next()
        break

      case 'delete':
        AUTH.check.proper(req)
        next()
        break

      default:
        next()
    }
  }

  return middleware
}
