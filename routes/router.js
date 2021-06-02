const user = require('../api/components/user/network_user')
const auth = require('../api/components/auth/network_auth')
const user_follow = require('../api/components/user_follow/network_follow')
const post = require('../api/components/post/network_post')
const post_like = require('../api/components/post_like/network_like')
const chat = require('../api/components/chat/network_chat')
const message = require('../api/components/messages/network_message')

const router = (server) => {
  server.use('/net/users', user)
  server.use('/net/auth', auth)
  server.use('/net/follow', user_follow)
  server.use('/net/post', post)
  server.use('/net/like', post_like)
  server.use('/net/chat', chat)
  server.use('/net/message', message)
}

module.exports = router
