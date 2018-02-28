'use strict';

const express = require('express');
const morgan = require('morgan');
const createError = require('http-errors');
const debug = require('debug')('cat:server');

const catRouter = require('./route/cat-router');
const cors = require('./lib/cors-middleware');
const errors = require('./lib/error-middleware');

const PORT = process.env.PORT || 3000;
const app = express();


app.use(morgan('dev'));
app.use(cors);
app.use(catRouter);
app.use(errors);

app.listen(PORT, () => {
  debug(`Server up on ${PORT}`);
});