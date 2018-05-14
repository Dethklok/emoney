const products = require('../models').products;
const HttpError = require('../error/httpError');

exports.post = function (req, res, next) {
  products
    .add(req.body)
    .then(product => {
      res.json(product);
    })
    .catch(err => {
      next(err);
    })
};

exports.get = function (req, res, next) {
  if (req.params.id) {
    products
      .get(req.params.id)
      .then(product => {
        if (product) {
          res.json(product);
        } else {
          next(new HttpError(404, "Product not found"));
        }
      })
      .catch(err => {
        next(err);
      })
  } else {
    products
      .list(req.session.user)
      .then(result => {
        res.json(result);
      })
      .catch(err => {
        next(err);
      })
  }
};

exports.put = function (req, res, next) {
  products
    .edit(req.body)
    .then(product => {
      if (product && product.userId === req.user) {
        res.json(product);
      } else {
        next(new HttpError(404, 'Product not found'));
      }
    })
    .catch(err => {
      next(err);
    })
};

exports.delete = function (req, res, next) {
  products
    .delete(req.params.id)
    .then(product => {
      if (product) {
        res.json(product);
      } else {
        next(new HttpError(404, "Product not found"));
      }
    })
    .catch(err => {
      next(err);
    })
};