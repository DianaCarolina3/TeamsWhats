function error(message, status) {
  let error = new Error(message)

  if (status) {
    error.statusCode = status
  }
  return error
}

module.exports = error
