'use strict';

const express = require('express');
const morgan = require('morgan');
const debug = require('debug')('car:server');

const carRouter = require('./route/car-router.js');
const cors = require('./lib/cors-middleware.js');
const errors = require('./lib/error-middleware.js');

const PORT = process.env.port || 3000;
const app = express();

app.use(morgan('dev'));
app.use(cors);
app.use(carRouter);
app.use(errors);

app.listen(PORT, () => {
  debug(`server up ${PORT}`);
});

// server -> router -> model -> storage