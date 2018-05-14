const users = require('../models').users;
const HttpError = require('../error/httpError');

exports.get = function (req, res, next) {

  users
    .findById(req.params.id)
    .then(user => {
      if (user) {
        res.json(user);
      } else {
        next(new HttpError(404, 'User not found'));
      }
    })
    .catch(err => {
      next(err);
    });
};