'use strict';

const HttpError = require('../error/httpError');

module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('orders', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM,
      values: ['initialized', 'in_progress', 'delivered', 'cancelled'],
    }
  }, {
    freezeTableName: true,
  });

  Order.associate = function (models) {
    models.orders.belongsTo(models.users);
    models.orders.belongsTo(models.customers);
    models.orders.hasMany(models.orderedProducts);
  };

  Order.add = function (data, orderedProducts, products) {
    let Order = this;

    return new Promise((resolve, reject) => {
      let tasks = [];
      Order
        .create({
          'title': data.title,
          'description': data.description,
          'userId': data.userId,
          'customerId': data.customerId
        })
        .then(order => {
          for (let product in data.products) {
            tasks.push(function (product) {
                return new Promise((resolve2, reject2) => {
                  orderedProducts
                    .create({
                      'count': data.products[product].count,
                      'orderId': order.id,
                      'productId': data.products[product].id
                    });

                  products
                    .update({
                      count: sequelize.literal('count - ' + data.products[product].count)
                    }, {
                      where: { id: data.products[product].id }
                    })
                    .then(() => {
                      resolve2();
                    })
                    .catch(err => {
                      reject2(err);
                    })
                })
            }(product))
          }
        })
        .then(() => {
          Promise.all(tasks).then(() => {
            resolve();
          })
        })
        .catch(err => {
          reject(err);
        })
    })
  };

  Order.list = function (user_id) {
    let Order = this;

    return new Promise((resolve, reject) => {
      Order
        .findAll({
          where: { userId: user_id }
        })
        .then(orders => {
          resolve(orders);
        })
        .catch(err => {
          reject(err);
        })
    })
  };

  Order.getOne = function (id) {
    let Order = this;

    return new Promise((resolve, reject) => {
      Order
        .getOne(id)
        .then(order => {
          resolve(order);
        })
        .catch(err => {
          reject(err);
        })
    })
  };


  Order.setStatus = function (id, status) {
    let Order = this;

    return new Promise((resolve, reject) => {
      Order
        .findById(id, { raw: true })
        .then(order => {
          if (!order || order.status === 'cancelled') {
            reject(new HttpError(404, 'Order not found or cancelled'));
          } else {
            order
              .update({ status: status })
              .then(order => {
                resolve(order);
              })
          }
        })
        .catch(err => {
          reject(err);
        })
    })
  };

  Order.cancel = function (id, orderedProducts, products) {
    let Order = this;

    return new Promise((resolve, reject) => {
      let tasks = [];
      Order
        .findById(id, { include: [orderedProducts] })
        .then(order => {
          order.update({ status: 'cancelled' });
          for (let product in order.orderedProducts) {
            tasks.push(function (product) {
              return new Promise((resolve2, reject2) => {
                products
                  .update({
                    count: sequelize.literal('count + ' + product.count)
                  }, {
                    where: { id: product.productId }
                  })
                  .then(() => {
                    resolve2();
                  })
                  .catch(err => {
                    reject2(err);
                  })
              })
            }(product))
          }
        })
        .then(() => {
          Promise.all(tasks).then(() => {
            resolve();
          })
            .catch(err => {
              reject(err);
            })
        })

    })
  };

  return Order;
};