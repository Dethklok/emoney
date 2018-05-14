const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const HttpError = require('./error/httpError');
const cors = require('cors');
const session = require('./middleware/session');

const app = express();


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(session);
//Routing
require('./routes')(app);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  if (typeof err === 'number') {
    err = new HttpError(err);
  }

  if (err instanceof HttpError) {
    res.json(err);
  } else {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    console.log(err);

    res.status(err.status || 500);
    res.json(err);
  }
});

module.exports = app;
