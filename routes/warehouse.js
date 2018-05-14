const warehouses = require('../models').warehouses;
const HttpError = require('../error/httpError');

exports.post = function (req, res, next) {
  let data = req.body;
  data.userId = req.user;

  warehouses
    .add(data)
    .then(warehouse => {
      res.json(warehouse);
    })
    .catch(err => {
      next(err);
    })
};

exports.get = function (req, res, next) {
  if (req.params.id) {
    warehouses
      .getOne(req.params.id)
      .then(warehouse => {
        if(warehouse) {
          res.json(warehouse);
        } else {
          next(new HttpError(404, 'Warehouse not found'));
        }
      })
      .catch(err => {
        next(err);
      })
  } else {
    warehouses
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
  warehouses
    .edit(req.body)
    .then(warehouse => {
      if (warehouse && warehouse.userId === req.user) {
          res.json(warehouse);
      } else {
        next(new HttpError(404, 'Warehouse not found'));
      }
    })
    .catch(err => {
      next(err);
    })
};

exports.delete = function (req, res, next) {
  warehouses
    .delete(req.params.id)
    .then(warehouse => {
      if (warehouse) {
        res.json(warehouse);
      } else {
        next(new HttpError(404, "Warehouse not found"));
      }
    })
    .catch(err => {
      next(err);
    })
};