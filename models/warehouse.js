'use strict';

module.exports = (sequelize, DataTypes) => {
  const Warehouse = sequelize.define('warehouses', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  }, {
    freezeTableName: true,
  });

  Warehouse.associate = function (models) {
    models.warehouses.belongsTo(models.users);
    models.warehouses.hasMany(models.products);
  };

  Warehouse.add = function (data) {
    let Warehouse = this;

    return new Promise((resolve, reject) => {
      Warehouse
        .create(data)
        .then(warehouse => {
          resolve(warehouse);
        })
        .catch(err => {
          reject(err);
        })
    });
  };

  Warehouse.list = function (user_id) {
    let Warehouse = this;

    return new Promise((resolve, reject) => {
      Warehouse
        .findAll({
          where: { userId: user_id }
        })
        .then(warehouses => {
          resolve(warehouses);
        })
        .catch(err => {
          reject(err);
        })
    })
  };

  Warehouse.getOne = function (id) {
    let Warehouse = this;

    return new Promise((resolve, reject) => {
      Warehouse
        .getOne(id)
        .then(warehouse => {
          resolve(warehouse);
        })
        .catch(err => {
          reject(err);
        })
    })
  };

  Warehouse.edit = function (data) {
    let Warehouse = this;

    return new Promise((resolve, reject) => {
      Warehouse
        .update(data, {
          where: { id: data.id }
        })
        .then(warehouse => {
          resolve(warehouse);
        })
        .catch(err => {
          reject(err);
        })
    })
  };

  Warehouse.delete = function (id) {
    let Warehouse = this;

    return new Promise((resolve, reject) => {
      Warehouse
        .destroy({
          where: { id: id }
        })
        .then(warehouse => {
          resolve(warehouse);
        })
        .catch(err => {
          reject(err);
        })
    })
  };

  return Warehouse;
};