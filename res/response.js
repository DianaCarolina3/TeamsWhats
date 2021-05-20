const statusMes = {
  200: 'OK',
  201: 'Created',
  301: 'Moved Permanently',
  304: 'Not Modified',
  400: 'Bad Request',
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'Not Found',
  500: 'Internal Server Error',
}

exports.success = (req, res, message, status) => {
  let statusCode = status
  let statusMessage = message

  if (!status) {
    statusCode = 200
  }
  if (!message) {
    statusMessage = statusMes[status]
  }

  res.status(status).send({
    error: false,
    status: statusCode,
    body: statusMessage,
  })
}

exports.error = (req, res, message, status) => {
  let statusCode = status
  let statusMessage = message

  if (!status) {
    statusCode = 500
  }
  if (!message) {
    statusMessage = statusMes[status]
  }

  res.status(status).send({
    error: statusMessage,
    status: statusCode,
    body: false,
  })
}
