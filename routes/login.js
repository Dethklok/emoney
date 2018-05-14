const users = require('../models').users;
const startSession = require('../middleware/session').startSession;

exports.post = function (req, res, next) {
  users
    .authorize(req.body)
    .then(user => {
      let token = startSession(user.id);
      res.json({
        'id': user.id,
        'username': user.username,
        'email': user.email,
        'createdAt': user.createdAt,
        'token': token
      });
    })
    .catch(err => {
      next(err);
    })
};