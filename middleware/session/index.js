'use strict';

const uid = require('uid-safe').sync;
const sessions = require('../../models').sessions;

exports = module.exports = function (req, res, next) {
  req.user = null;

  if (!req.header('Authorization')) next();

  sessions
    .findBySid(req.header('Authorization'))
    .then(session => {
      if (session) {
        req.user = session.userId;
        next();
      }
    })
    .catch(err => {
      next(err);
    });
};

exports.startSession = function (userId) {
  let data = {
    sid: generateSessionId(),
    userId: userId,
  };
  sessions.add(data);

  return data.sid;
};

function generateSessionId() {
  return uid(24);
}