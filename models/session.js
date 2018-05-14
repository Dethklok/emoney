'use strict';

module.exports = (sequelize, DataTypes) => {
  const Session = sequelize.define('sessions', {
    sid: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    freezeTableName: true,
  });
  
  Session.add = function (data) {
    let Session = this;

    return new Promise((resolve, reject) => {
      Session
        .create(data)
        .then(session => {
          resolve(session);
        })
        .catch(err => {
          reject(err);
        })
    })
  };

  Session.findBySid = function (sid) {
    let Session = this;

    return new Promise((resolve, reject) => {
      Session
        .findOne({
          where: { 'sid': sid }
        })
        .then(session => {
          resolve(session);
        })
        .catch(err => {
          reject(err);
        })
    })
  };

  Session.destroyBySid = function (sid) {
    let Session = this;

    return new Promise((resolve, reject) => {
      Session
        .destroy({
          where: { sid: sid }
        })
        .then(() => {
          resolve();
        })
        .catch(err => {
          reject(err);
        })
    })
  };

  return Session;
};