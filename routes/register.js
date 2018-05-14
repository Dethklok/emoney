const users = require('../models').users;
const RegisterError = require('../error/registerError');
const startSession = require('../middleware/session').startSession;

exports.post = function (req, res, next) {
  if (req.body.password !== req.body.confirmPassword) {
    return new RegisterError('Passwords do not match');
  } else {
    users
      .register(req.body)
      .then(user => {
        user.token = startSession(user.id);
        res.json(user);
      })
      .catch(err => {
        next(err);
      })
  }
};