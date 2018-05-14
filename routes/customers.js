const customers = require('../models').customers;
const HttpError = require('../error/httpError');

exports.post = function (req, res, next) {
  let data = req.body;
  data.userId = req.user;

  customers
    .add(data)
    .then(customer => {
      res.json(customer);
    })
    .catch(err => {
      next(err);
    })
};

exports.get = function (req, res, next) {
  if (req.params.id) {
    customers
      .getOne(req.params.id)
      .then(customer => {
        if (customer) {
          res.json(customer);
        } else {
          next(new HttpError(404, "Customer not found"));
        }
      })
      .catch(err => {
        next(err);
      })
  } else {
    customers
      .list(req.user)
      .then(result => {
        res.json(result);
      })
      .catch(err => {
        next(err);
      })
  }
};

exports.put = function (req, res, next) {
  customers
    .edit(req.body)
    .then(customer => {
      if (customer && customer.userId === req.user) {
        res.json(customer);
      } else {
        next(new HttpError(404, 'Customer not found'));
      }
    })
    .catch(err => {
      next(err);
    })
};

exports.delete = function (req, res, next) {
  customers
    .delete(req.params.id)
    .then(customer => {
      if (customer) {
        res.json(customer);
      } else {
        next(new HttpError(404, "Customer not found"));
      }
    })
    .catch(err => {
      next(err);
    })
};