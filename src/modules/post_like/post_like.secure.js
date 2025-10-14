/* eslint-disable no-case-declarations */
const AUTH = require('../../Auth')

module.exports = function checkAuth(action) {
  async function middleware(req, res, next) {
    try {
      switch (action) {
        case 'like':
          const owner = req.body.like_from
          await AUTH.check.verifyOwnership(req, owner)
          next()
          break

        case 'delete':
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
