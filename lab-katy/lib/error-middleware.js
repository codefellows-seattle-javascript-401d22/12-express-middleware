'use strict';

const debug = require('debug')('weed:error-middleware');
const createError = require('http-errors');

module.exports = function(err, req, res, next) { //express recognises this as error middleware because error first
  console.error(err.message);

  if(err.status) {
    debug('user error');
    res.status(err.status).send(err.name);
    next();
    return;
  }
  //in the instance that we dont get given a status code were goin to use http-errors to handle that code for us. going to throw a generic 500 server error

  debug('server error');
  err = createError(500, err.message);
  res.status(err.status).send(err.name);
  next();
}
