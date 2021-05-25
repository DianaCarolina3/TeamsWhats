const user = require('../api/components/user/network_user')
// const auth = require('../api/components/auth/network_auth')

const router = (server) => {
  server.use('/net/user', user)
  // server.use('/net/auth', auth)
}

module.exports = router
