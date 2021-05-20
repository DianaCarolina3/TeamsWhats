const user = require('../api/components/user/network_user')

const router = (server) => {
  server.use('/net/user', user)
}

module.exports = router
