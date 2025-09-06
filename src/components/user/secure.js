/* eslint-disable no-case-declarations */
const AUTH = require('../../Auth')

module.exports = function checkAuth(action) {
  function middleware(req, res, next) {
    switch (action) {
      case 'update':
        //for id and token
        // verífica que el token pertenezca al dueño
        const owner = req.params.id
        /// AUTH.check.own(req, owner)
        AUTH.check.verifyOwnership(req, owner)
        next()
        break

      case 'remove':
        //for only token
        // verifica solo que el token sea válido
        /// AUTH.check.proper(req)
        AUTH.check.verifyToken(req)
        next()
        break

      default:
        next()
    }
  }

  return middleware
}
