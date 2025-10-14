const jwt = require('jsonwebtoken')
const error = require('../utils/error')
const config = require('../config')
const { store } = require('../config/dependencies')

//genera token al iniciar seccion
const sign = (dataAuth) => {
  // data contiene id, username y password
  const data = JSON.parse(JSON.stringify(dataAuth))
  // aqui se firma marca el tiempo de expiración
  return jwt.sign(data, config.auth_jwt.secret, { expiresIn: '1h' })
}

//verifica token
function verify(token) {
  try {
    return jwt.verify(token, config.auth_jwt.secret)
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      throw error('Token Expired', 498)
    } else {
      throw error('Invalid Token', 498)
    }
  }
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
  verifyOwnership: async function (req, owner) {
    const decoded = await decodedHeader(req)
    if (decoded.user_id !== owner) {
      throw error('Invalid token', 401)
    }
    return decoded
  },
  //for only token
  //proper
  verifyToken: async function (req) {
    await decodedHeader(req)
  },
}

//decodificacion y comprobacion de la inforamcion extraida del header
const decodedHeader = async (req) => {
  const authorization = req.headers.authorization || ''
  const token = getToken(authorization)
  const decoded = verify(token)
  // verificar si user existe o se elimino
  const user = await store.get('users', decoded.user_id)
  if (!user) {
    throw error(`User does not exist or was deleted`, 401)
  }
  // queda disponible user en la req
  req.user = decoded
  return decoded
}

module.exports = {
  sign,
  check,
}
