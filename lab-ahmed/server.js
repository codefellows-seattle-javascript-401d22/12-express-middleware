'use strict';
//3rd party module npm
const express = require('express');
const morgan = require('morgan');
const createError = require('http-errors');
const debug = require('debug')('note:sever');
//custom middlware we created
const noteRouter = require('./route/note-router.js');
const cors = require('./lib/cors-middleware.js');
const errors = require('./lib/error-middleware.js');
//application constant
const PORT = process.env.PORT || 3000;
const app = express();
//application level middleware
app.use(morgan('dev'));
//use cors middleware
app.use(cors);
//use error middleware
app.use(errors);
//
app.use(noteRouter);
//listen on are port
app.listen(PORT, () => {
  debug(`server up ${PORT}`);
});