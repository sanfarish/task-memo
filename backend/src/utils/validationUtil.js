const { validationResult } = require('express-validator')
const throwError = require('./throwError')

module.exports = (req) => {
  const validation = validationResult(req)
  if (!validation.isEmpty()) {
    throwError(400, validation.errors[0].msg)
  };
}
