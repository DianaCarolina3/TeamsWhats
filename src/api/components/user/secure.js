/* eslint-disable no-case-declarations */
const AUTH = require('../../../Auth')

module.exports = function checkAuth(action) {
  function middleware(req, res, next) {
    switch (action) {
      case 'update':
        //for id and token
        const owner = req.body.id
        AUTH.check.own(req, owner)
        next()
        break

      case 'remove':
        //for token
        AUTH.check.proper(req)
        next()
        break

      default:
        next()
    }
  }

  return middleware
}
