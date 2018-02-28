'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const debug = ('debug')('weed:weed-router');
const Weed = require('../model/weed.js');
const noteRouter = new Router();

weedRouter.post('/api/weed', jsonParser, function(req, res, next) {
  debug('POST: /api/note');

  Weed.createWeed(req.body)
  .then( weed => res.json(weed))
  .catch( err => next(err))
});