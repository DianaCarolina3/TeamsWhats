const jwt = require('jsonwebtoken')
const error = require('../utils/error')
const config = require('../config')

//genera token al iniciar seccion
const sign = (dataAuth) => {
  // data contiene id, username y password
  const data = JSON.parse(JSON.stringify(dataAuth))
  return jwt.sign(data, config.auth_jwt.secret)
}

//verifica token
function verify(token) {
  return jwt.verify(token, config.auth_jwt.secret, { exp: '1h' })
}

//token
function getToken(authorization) {
  if (!authorization) {
    throw error('No token', 401)
  }

  //verificar que si sea el formato del Bearer token
  //Bearer dgtjegijdegjk
  if (authorization.indexOf('Bearer ') === -1) {
    throw error('Invalid Format', 401)
  }

  //remplaza a un token solo sin el Bearer, o sea, no a 'Bearer qwertsds', si no a 'qwertsds'
  //1.Bearer - 2.kfsfioepohgjr : se usa la parte 2 el token
  return authorization.replace('Bearer ', '')
}

//comprobacion de identidad segun id y token
const check = {
  //for id and token
  //own
  verifyOwnership: function (req, owner) {
    const decoded = decodedHeader(req)
    if (decoded.id !== owner) {
      throw error('Invalid token', 401)
    }
    return decoded
  },
  //for only token
  //proper
  verifyToken: function (req) {
    decodedHeader(req)
  },
}

//decodificacion y comprobacion de la inforamcion extraida del header
const decodedHeader = (req) => {
  const authorization = req.headers.authorization || ''
  const token = getToken(authorization)
  const decoded = verify(token)
  // queda disponible user en la req
  req.user = decoded
  return decoded
}

module.exports = {
  sign,
  check,
}
