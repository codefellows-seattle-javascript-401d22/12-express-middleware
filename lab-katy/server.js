'use strict';

const express =  require('express');//3rd party middleware
const morgan = require('morgan');
const createError = require('http-errors');
const debug = require('debug')('weed-server');

const weedRouter = require('./route/weed-router.js');
const cors = require('./lib/cors-middleware.js'); //our middleware
const errors = require('./lib/error-middleware.js');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(morgan('dev'));
app.use(cors);
app.use(weedRouter);
app.use(errors); //last thing before the server starts


app.listen(PORT, () => {
  debug(`server up: ${PORT}`);
});

