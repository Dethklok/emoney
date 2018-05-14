const orders = require('../models').orders;
const orderedProducts = require('../models').orderedProducts;
const products = require('../models').products;
const HttpError = require('../error/httpError');

exports.post = function (req, res, next) {
  let data = req.body;
  data.userId = req.user;

  orders
    .add(data, orderedProducts, products)
    .then(() => {
      res.json( {"success": true} );
    })
    .catch(err => {
      next(err);
    });
};

exports.get = function (req, res, next) {
  if (req.params.id) {
    orders
      .getOne(req.params.id)
      .then(order => {
        if (order) {
          res.json(order)
        } else {
          next(new HttpError(404, 'Order not found'));
        }
      })
      .catch(err => {
        next(err);
      })
  } else {
    orders
      .list(req.user)
      .then(orders => {
        res.json(orders);
      })
      .catch(err => {
        next(err);
      })
  }
};

exports.delete = function (req, res, next) {
  orders
    .cancel(req.params.id, orderedProducts, products)
    .then(() => {
      res.send("Order successful cancelled");
    })
    .catch(err => {
      next(err);
    })
};

exports.put = function (req, res, next) {
  orders
    .setStatus(req.body.id, req.body.status)
    .then(order => {
      res.json(order);
    })
    .catch(err => {
      next(err);
    })
};