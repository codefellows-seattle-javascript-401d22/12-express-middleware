'use strict';

const debug = require('debug')('car:error-middleware');
const createError = require('http-errors');

module.exports = function(err, req, res, next) {
  console.error(err.message);

  if(err.status) {
    debug('user error');
    res.status(err.status).send(err.name);
    next();
    return;
  }

  else if(err.toString().indexOf('expected')>-1) {
    res.status(400).send(err.name);
    next();
    return;
  }

  debug('server error');
  err = createError(500, err.message);
  res.status(err.status).send(err.name);
  next();
};

// if there is an error status it will responsd with the error status and error name or else it will create an error status and respond with that