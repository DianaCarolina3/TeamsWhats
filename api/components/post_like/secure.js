/* eslint-disable no-case-declarations */
const AUTH = require('../../../Auth')

module.exports = function checkAuth(action) {
  function middleware(req, res, next) {
    switch (action) {
      case 'like':
        const owner = req.body.like_from_post
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
