'use strict';

// 3rd Party middleware
const express = require('express');
const morgan = require('morgan');
const createError = require('http-errors');
const debug = require('debug')('note:server');

// Router
const noteRouter = require('./route/note-router.js');

// Custom middleware
const cors = require('./lib/cors-middleware.js');
const errors = require('./lib/error-middleware.js');

// Application constants
const PORT = process.env.PORT || 3000;
const app = express();

// Application middleware
app.use(morgan('dev'));
app.use(cors);
app.use(noteRouter);
app.use(errors);

app.listen(PORT, () => {
  debug(`server up on port ${PORT}`);
});