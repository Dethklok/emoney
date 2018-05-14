const util = require('util');

function RegisterError(message) {
  Error.apply(this, arguments);
  Error.captureStackTrace(this, RegisterError);

  this.message = message;
}

util.inherits(RegisterError, Error);
RegisterError.prototype.name = 'RegisterError';
module.exports = RegisterError;