'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const debug = require('debug')('weed:weed-router');
const Weed = require('../model/weed.js');
const weedRouter = new Router();

weedRouter.post('/api/weed', jsonParser, function(req, res, next) {
  debug('POST: /api/weed');

  Weed.createWeed(req.body)
    .then( weed => res.json(weed))
    .catch( err => next(err));
});

weedRouter.get('/api/weed/:weedId', function(req, res, next) {
  debug('GET: /api/weed/:weedId');

  Weed.fetchWeed(req.params.weedId)
    .then( weed => res.json(weed))
    .catch( err => next(err));
});

weedRouter.get('/api/weed', function(req, res, next) {
  debug('GET: /api/weed');

  Weed.fetchIDs()
    .then( ids => res.json(ids))
    .catch( err => next(err));
});

weedRouter.put('/api/weed/:weedId', jsonParser, function(req, res, next){
  debug('PUT: /api/weed/:weedId');

  Weed.updateWeed(req.params.weedId, req.body)
    .then( weed => res.json(weed))
    .catch( err => next(err));
});

weedRouter.delete('/api/weed/:weedId', function(req, res, next) {
  debug('DELETE: /api/weed/:weedId');

  Weed.smokeweed(req.params.weedId)
    .catch( err => next(err));
});

module.exports = weedRouter;