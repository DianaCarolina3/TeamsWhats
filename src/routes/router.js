const user = require('../components/user/network_user')
const auth = require('../components/auth/network_auth')
const user_follow = require('../components/user_follow/network_follow')
const post = require('../components/post/network_post')
const post_like = require('../components/post_like/network_like')
const chat = require('../components/chat/network_chat')
const message = require('../components/messages/network_message')

const router = (app) => {
  app.use('/teamswhats/users', user)
  app.use('/teamswhats/auth', auth)
  app.use('/teamswhats/follow', user_follow)
  app.use('/teamswhats/post', post)
  app.use('/teamswhats/like', post_like)
  app.use('/teamswhats/chat', chat)
  app.use('/teamswhats/message', message)
}

module.exports = router
