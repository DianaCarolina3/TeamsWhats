const pool = require('../../../connection/connetSQL-posgre')

//get Following
const getFollowing = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT * FROM user_follow
      JOIN users ON (users.id = user_follow.user_to)
      WHERE user_from = $1;`,
      [id],
      (err, result) => {
        if (err) return reject(err)
        resolve(
          result.rows.map(({ user_to, username }) => {
            let following = {
              user_to: user_to,
              username: username,
            }
            return following
          })
        )
      }
    )
  })
}

// //get followers
const getFollowers = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT * FROM user_follow
      JOIN users ON (users.id = user_follow.user_from)
      WHERE user_to = $1;`,
      [id],
      (err, result) => {
        if (err) return reject(err)
        resolve(
          result.rows.map(({ user_from, username }) => {
            let followers = {
              user_to: user_from,
              username: username,
            }
            return followers
          })
        )
      }
    )
  })
}

//add user following other user
const insertFollow = (table, data) => {
  return new Promise((resolve, reject) => {
    let from = data.user_from
    let to = data.user_to

    pool.query(
      `INSERT INTO "${table}" (user_from, user_to) VALUES ($1, $2)`,
      [from, to],
      (err, result) => {
        if (err) return reject(err)
        resolve(result.rows)
      }
    )
  })
}

//remove follow in user_follow
const Unfollowed = (user_from, user_to_id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `DELETE FROM "user_follow" WHERE user_from=$1 AND user_to=$2`,
      [user_from, user_to_id],
      (err, res) => {
        if (err) return reject(err)
        resolve(res.rows)
      }
    )
  })
}

module.exports = {
  getFollowing,
  getFollowers,
  insertFollow,
  Unfollowed,
}
