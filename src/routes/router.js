const user = require('../modules/user/user.controller')
const auth = require('../modules/auth/auth.controller')
const user_follow = require('../modules/user_follow/user_follow.controller')
const post = require('../modules/post/post.controller')
const post_like = require('../modules/post_like/post_like.controller')
const chat = require('../modules/chat/chat.controller')
const message = require('../modules/messages/message.controller')

const router = (app) => {
  app.use('/users', user)
  app.use('/auth', auth)
  app.use('/follow', user_follow)
  app.use('/post', post)
  app.use('/like', post_like)
  app.use('/chat', chat)
  app.use('/message', message)
}

module.exports = router
