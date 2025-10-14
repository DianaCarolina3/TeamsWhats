/* eslint-disable no-case-declarations */
const AUTH = require('../../Auth')
const { store } = require('../../config/dependencies')
const error = require('../../utils/error')

module.exports = function checkAuth(action) {
  async function middleware(req, res, next) {
    try {
      switch (action) {
        case 'post':
        case 'update':
          const owner = req.params.id
          await AUTH.check.verifyOwnership(req, owner)
          next()
          break

        case 'delete':
          await AUTH.check.verifyToken(req)

          const postIdExists = await store.get('post', req.params.idPost)
          if (!postIdExists) {
            throw error('Post does not exists', 400)
          }
          if (postIdExists.user_id !== req.user.user_id) {
            throw error('You are not the owner of this post', 401)
          }

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
