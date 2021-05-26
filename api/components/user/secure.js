/* eslint-disable no-case-declarations */
const AUTH = require('../../../Auth')

module.exports = function checkAuth(action) {
  function middleware(req, res, next) {
    switch (action) {
      case 'update':
        const owner = req.body.id
        AUTH.check.own(req, owner)
        next()
        break

      default:
        next()
    }
  }

  return middleware
}
