'use strict';

const crypto = require('crypto');
//Errors
const AuthError = require('../error/authError');
const RegisterError = require('../error/registerError');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('users', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    salt: {
      type: DataTypes.STRING,
      allowNull: false
    },
    hashedPassword: {
      type: DataTypes.STRING,
      allowNull: false,
      value: 'password'
    },
    password: {
      type: DataTypes.VIRTUAL,
      allowNull: true,
      set(password) {
        this.salt = Math.random() + '';
        this.hashedPassword = this.encryptPassword(password);
      },
      validate: {
        min: 8
      }
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: true
      }
    }

  }, {
    freezeTableName: true,
  });

  User.associate = function (models) {
    models.users.hasMany(models.warehouses);
    models.users.hasMany(models.customers);
    models.users.hasMany(models.orders);
  };

  User.prototype.encryptPassword = function (password) {
    return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
  };

  User.prototype.checkPassword = function (password) {
    return this.encryptPassword(password) === this.hashedPassword;
  };

  // Auth
  User.authorize = function (data) {
    let User = this;

    return new Promise((resolve, reject) => {
      User
        .findOne({ where: { username: data.username } })
        .then(user => {
          if(user) {
            if (user.checkPassword(data.password)) {
              resolve(user);
            } else {
              reject(new AuthError('Incorrect password'));
            }
          } else {
            reject (new AuthError('Cannot find this username'));
          }
        })
        .catch(err => {
          reject(err);
        })
    })

  };

  //Register
  User.register = function (data) {
    let User = this;

    return new Promise((resolve, reject) => {
      User
        .findOne({
          where: {
            [sequelize.Op.or]: [
              { username: data.username },
              { email: data.email }
            ]
          }
        })
        .then(user => {
          if (!user) {
            User
              .create(data)
              .then(user => {
                resolve(user);
              })
          } else {
            if (user.username === data.username) reject(new RegisterError('Username already exists'));
            if (user.email === data.email) reject(new RegisterError('Email already exists'));
          }
        })
        .catch(err => {
          reject(err);
        })
    })
  };

  return User;
};