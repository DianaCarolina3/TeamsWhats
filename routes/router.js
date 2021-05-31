const user = require('../api/components/user/network_user')
const auth = require('../api/components/auth/network_auth')
const user_follow = require('../api/components/user_follow/network_follow')
const post = require('../api/components/post/network_post')

const router = (server) => {
  server.use('/net/users', user)
  server.use('/net/auth', auth)
  server.use('/net/follow', user_follow)
  server.use('/net/post', post)
}

module.exports = router
