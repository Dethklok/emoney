const sessions = require('../models').sessions;

exports.post = function (req, res, next) {
  sessions
    .destroyBySid(req.header('Authorization'))
    .then(() => {
      res.end();
    })
    .catch(err => {
      next(err);
    })
};