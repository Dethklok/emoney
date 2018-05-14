'use strict';

module.exports = (sequelize, DataTypes) => {
  const Customer = sequelize.define('customers', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    freezeTableName: true,
  });

  Customer.associate = function (models) {
    models.customers.belongsTo(models.users);
    models.customers.hasMany(models.orders);
  };

  Customer.add = function (data) {
    let Customer = this;

    return new Promise((resolve, reject) => {
      Customer
        .create(data)
        .then(customer => {
          resolve(customer);
        })
        .catch(err => {
          reject(err);
        })
    });
  };

  Customer.list = function (user_id) {
    let Customer = this;

    return new Promise((resolve, reject) => {
      Customer
        .findAll({
          where: { userId: user_id }
        })
        .then(customers => {
          resolve(customers);
        })
        .catch(err => {
          reject(err);
        })
    })
  };

  Customer.getOne = function (id) {
    let Customer = this;

    return new Promise((resolve, reject) => {
      Customer
        .getOne(id)
        .then(customer => {
          resolve(customer);
        })
        .catch(err => {
          reject(err);
        })
    })
  };

  Customer.edit = function (data) {
    let Customer = this;

    return new Promise((resolve, reject) => {
      Customer
        .update(data, {
          where: { id: data.id }
        })
        .then(customer => {
          resolve(customer);
        })
        .catch(err => {
          reject(err);
        })
    })
  };

  Customer.delete = function (id) {
    let Customer = this;

    return new Promise((resolve, reject) => {
      Customer
        .destroy({
          where: { id: id }
        })
        .then(customer => {
          resolve(customer);
        })
        .catch(err => {
          reject(err);
        })
    })
  };

  return Customer;
};