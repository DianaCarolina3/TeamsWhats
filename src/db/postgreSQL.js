//functions of connections to postgresql
const pool = require('../connection/connetSQL-posgre')

const user_auth = require('./SQL/postgre/user-auth_sql')
const follow = require('./SQL/postgre/user_follow_sql')
const post = require('./SQL/postgre/post_sql')
const post_like = require('./SQL/postgre/post_like_sql')
const chat = require('./SQL/postgre/chat_sql')
const message = require('./SQL/postgre/message_sql')

//USER AND AUTH
async function upsert(table, data) {
  return await user_auth.upsert(table, data)
}

async function removeOneUser(id) {
  return await user_auth.removeOneUser(id)
}

//USER_FOLLOW
async function getFollowing(id) {
  return await follow.getFollowing(id)
}

async function getFollowers(id) {
  return await follow.getFollowers(id)
}

async function insertFollow(table, data) {
  return await follow.insertFollow(table, data)
}

async function Unfollowed(user_from, user_to_id) {
  return await follow.Unfollowed(user_from, user_to_id)
}

//POST
async function addPost(table, data) {
  return await post.addPost(table, data)
}

async function updatePost(table, data) {
  return await post.updatePost(table, data)
}

//POST_LIKE
async function like(table, data) {
  return await post_like.like(table, data)
}

async function getPost(id) {
  return await post_like.getPost(id)
}

async function removePost(table, id) {
  return await post_like.removePost(table, id)
}

//CHAT
async function addChat(table, data) {
  return await chat.addChat(table, data)
}

async function conversations() {
  return await chat.conversations()
}

async function oneConversations(id) {
  return await chat.oneConversations(id)
}

//MESSAGE
async function addMessage(table, data) {
  return await message.addMessage(table, data)
}

async function updateMessage(table, data) {
  return await message.updateMessage(table, data)
}

async function deleteMessage(table, id) {
  return await message.deleteMessage(table, id)
}

async function getMessage(table, id) {
  return await message.getMessage(table, id)
}

//FUNCTIONS ALL REQUIRED
// //all list table
const list = (table) => {
  return new Promise((resolve, reject) => {
    pool.query(`SELECT * FROM "${table}"`, (err, result) => {
      if (err) return reject(err)

      resolve(result.rows)
    })
  })
}

// //get item table
const get = (table, id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT * FROM "${table}" WHERE id = $1`,
      [id],
      (err, result) => {
        if (err) return reject(err)
        resolve(result.rows[0])
      }
    )
  })
}

// // remove item from table
const remove = (table, id) => {
  return new Promise((resolve, reject) => {
    pool.query(`DELETE FROM "${table}" WHERE id=$1`, [id], (err, result) => {
      if (err) return reject(err)
      resolve(result.rows)
    })
  })
}

// //login and autentification
const query = (table, query) => {
  return new Promise((resolve, reject) => {
    let username = query.username

    pool.query(
      `SELECT * FROM "${table}" WHERE username=$1 `,
      [username],
      (err, result) => {
        if (err) return reject(err)
        resolve(result.rows[0])
      }
    )
  })
}

module.exports = {
  //user - auth - other
  list,
  get,
  remove,
  upsert,
  query,
  removeOneUser,
  //follow
  getFollowing,
  getFollowers,
  Unfollowed,
  insertFollow,
  //post
  addPost,
  updatePost,
  getPost,
  removePost,
  //chat
  addChat,
  conversations,
  oneConversations,
  //message
  addMessage,
  updateMessage,
  deleteMessage,
  getMessage,
  //post_like
  like,
}
