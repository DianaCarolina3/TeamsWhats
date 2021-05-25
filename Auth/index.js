// const jwt = require('jsonwebtoken')
// const error = require('../utils/error')
// require('dotenv').config({ path: '.env' })

// const verify = (token) => {
//   jwt.verify(token, process.env.SECRET)
// }

// const getToken = (autorization) => {
//   if (!autorization) {
//     throw error('No autorization', 401)
//   }

//   // si Bearer no viene o no existe
//   if (autorization.indexOf('Bearer ') === -1) {
//     throw error('No autorization', 401)
//   }

//   let token = autorization.replace('Bearer ', '')
//   return token
// }

// function decodeHeader(req) {
//   const autorization = req.headers.autorization || null
//   const token = getToken(autorization)
//   const decoded = verify(token)

//   // req.user = decoded

//   return decoded
// }

// module.exports = {
//   // sign,
//   // check,
// }
