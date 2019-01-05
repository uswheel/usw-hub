module.exports = function error(code, message) {
  const error = {
    code: code,
    message: message,
  }
  return error;
}