'use strict';

// 3rd Party middleware
const express = require('express');
const morgan = require('morgan');
const createError = require('http-errors');
const debug = require('debug')('dog:server');

// Router
const dogRouter = require('./route/dog-router.js');

// Custom middleware
const cors = require('./lib/cors-middleware.js');
const errors = require('./lib/error-middleware.js');

// Application constants
const PORT = process.env.PORT || 3000;
const app = express();

// Application middleware
app.use(morgan('dev'));
app.use(cors);
app.use(dogRouter);
app.use(function (req, res, next) {
  res.status(404).send('Sorry can\'t find that!');
  next();
});
app.use(errors);

app.listen(PORT, () => {
  debug(`server up on port ${PORT}`);
});