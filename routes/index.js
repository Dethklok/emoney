module.exports = function (app) {
  //Session
  app.post('/register/', require('./register').post);
  app.post('/login/', require('./login').post);
  app.post('/logout/', require('./logout').post);

  app.get('/user/:id', require('./user').get);

  //Warehouses
  app.post('/warehouse/', require('./warehouse').post);
  app.get('/warehouse/', require('./warehouse').get);
  app.get('/warehouse/:id', require('./warehouse').get);
  app.put('/warehouse/', require('./warehouse').put);
  app.delete('/warehouse/:id', require('./warehouse').delete);

  //Products
  app.post('/product/', require('./product').post);
  app.get('/product/', require('./product').get);
  app.get('/product/:id', require('./product').get);
  app.put('/product/', require('./product').put);
  app.delete('/product/:id', require('./product').delete);

  //Customers
  app.post('/customer/', require('./customers').post);
  app.get('/customer', require('./customers').get);
  app.get('/customer/:id', require('./customers').get);
  app.put('/customer/', require('./customers').put);
  app.delete('/customer/:id', require('./customers').delete);

  //Orders
  app.post('/order/', require('./order').post);
};
