const user = require('../api/components/user/network_user')
const auth = require('../api/components/auth/network_auth')
const user_follow = require('../api/components/user_follow/network_follow')
const post = require('../api/components/post/network_post')
const post_like = require('../api/components/post_like/network_like')
const chat = require('../api/components/chat/network_chat')
const message = require('../api/components/messages/network_message')

const router = (app) => {
  app.use('/TeamsWhats/users', user)
  app.use('/TeamsWhats/auth', auth)
  app.use('/TeamsWhats/follow', user_follow)
  app.use('/TeamsWhats/post', post)
  app.use('/TeamsWhats/like', post_like)
  app.use('/TeamsWhats/chat', chat)
  app.use('/TeamsWhats/message', message)
}

module.exports = router
