'use strict';

module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('products', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    count: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {
    freezeTableName: true,
  });

  Product.associate = function (models) {
    models.products.belongsTo(models.warehouses);
    models.products.hasMany(models.orderedProducts);

    this.warehouses = models.warehouses;
  };

  Product.add = function (data) {
    let Product = this;

    return new Promise((resolve, reject) => {
      Product
        .create(data)
        .then(product => {
          resolve(product);
        })
        .catch(err => {
          reject(err);
        })
    });
  };

  Product.list = function (user_id) {
    let Product = this;

    return new Promise((resolve, reject) => {
      Product
        .findAndCountAll({
          include: [
            { model: Product.warehouses, where: { userId: user_id } }
          ],
        })
        .then(result => {
          resolve(result);
        })
        .catch(err => {
          reject(err);
        })
    });
  };

  Product.getOne = function (id) {
    let Product = this;

    return new Promise((resolve, reject) => {
      Product
        .getOne(id)
        .then(product => {
          resolve(product);
        })
        .catch(err => {
          reject(err);
        })
    })
  };

  Product.edit = function (data) {
    let Product = this;

    return new Promise((resolve, reject) => {
      Product
        .update(data, {
          where: { id: data.id }
        })
        .then(product => {
          resolve(product);
        })
        .catch(err => {
          reject(err);
        })
    })
  };

  Product.delete = function (id) {
    let Product = this;

    return new Promise((resolve, reject) => {
      Product
        .destroy({
          where: { id: id }
        })
        .then(product => {
          resolve(product);
        })
        .catch(err => {
          reject(err);
        })
    })
  };

  return Product;
};