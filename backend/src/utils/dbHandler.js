const throwError = require('./throwError')

module.exports = async (db) => {
  try {
    return await db
  } catch (error) {
    throwError(400, error.errors[0].message)
  };
}
