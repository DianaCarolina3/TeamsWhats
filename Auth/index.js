const jwt = require('jsonwebtoken')
const error = require('../utils/error')
require('dotenv').config({ path: '.env' })

//genera token al iniciar seccion
const sign = (dataAuth) => {
  const data = JSON.parse(JSON.stringify(dataAuth))
  return jwt.sign(data, process.env.SECRET)
}

//verifica token
function verify(token) {
  return jwt.verify(token, process.env.SECRET, { exp: '1h' })
}

//token
function getToken(autorization) {
  if (!autorization) {
    throw error('No token', 401)
  }

  //verificar que si sea el formato del Bearer token
  //Bearer dgtjegijdegjk
  if (autorization.indexOf('Bearer ') === -1) {
    throw error('Invalid Format', 401)
  }

  //remplaza a un token blanco
  //1.Bearer - 2.kfsfioepohgjr : se usa la parte 2 el token
  let token = autorization.replace('Bearer ', '')
  return token
}

//comprobacion de identidad segun id y token
const check = {
  own: function (req, owner) {
    const decoded = decodedHeader(req)
    if (decoded.id !== owner) {
      throw error('Invalid token', 401)
    }
    return decoded
  },
  proper: function (req) {
    decodedHeader(req)
  },
}

//decodificacion y comprobacion de la inforamcion extraida del header
const decodedHeader = (req) => {
  const autorization = req.headers.authorization || ''
  const token = getToken(autorization)
  const decoded = verify(token)
  req.user = decoded
  return decoded
}

module.exports = {
  sign,
  check,
}
