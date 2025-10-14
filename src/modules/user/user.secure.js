/* eslint-disable no-case-declarations */
const AUTH = require('../../Auth')

module.exports = function checkAuth(action) {
  async function middleware(req, res, next) {
    try {
      switch (action) {
        case 'update':
        case 'remove':
          //for id and token
          // verífica que el token pertenezca al dueño
          const owner = req.params.id
          /// AUTH.check.own(req, owner)
          await AUTH.check.verifyOwnership(req, owner)
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
