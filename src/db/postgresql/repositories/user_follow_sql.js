const pool = require('../connection')

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
            return {
              following: {
                id: user_to,
                username: username,
              },
            }
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
            return {
              followers: {
                id: user_from,
                username: username,
              },
            }
          })
        )
      }
    )
  })
}

//add a user follow another user
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
