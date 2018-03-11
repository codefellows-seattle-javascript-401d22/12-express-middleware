'use strict';

const express = require('express');
const morgan = require('morgan');
const debug = require('debug')('beer:server');

const beerRouter = require('./route/beer-router.js');
const cors = require('./lib/cors-middleware.js');
const errors = require('./lib/error-middleware.js');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(morgan('dev'));
app.use(cors);
app.use(beerRouter);
app.use(errors);

app.listen(PORT, () => {
  debug(`Server up on ${PORT}`);
});
