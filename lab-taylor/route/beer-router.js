'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const debug = require('debug')('beer:router');
const Beer = require('../model/beer.js');
const beerRouter = new Router();

beerRouter.post('/api/beer', jsonParser, function(req, res, next) {
  debug('POST: /api/beer');

  Beer.createBeer(req.body)
    .then( beer => res.json(beer))
    .catch(err => next(err));
});

beerRouter.get('/api/beer/:id', function(req, res, next) {
  debug('GET: /api/beer/:id');

  Beer.fetchBeer(req.params.id)
    .then( beer => res.json(beer))
    .catch( err => next(err));
});

beerRouter.get('/api/beer', function(req, res, next) {
  debug('GET: /api/beer');

  Beer.fetchIDs()
    .then(ids => res.json(ids))
    .catch( err => next(err));
});

beerRouter.put('/api/beer/:id', jsonParser, function(req, res, next) {
  debug('PUT: /api/beer/:id');

  Beer.updateBeer(req.params.id, req.body)
    .then(beer => res.json(beer))
    .catch(err => next(err));
});

beerRouter.delete('/api/beer/:id', function(req, res, next) {
  debug('DELETE: /api/beer/:id');

  Beer.deleteBeer(req.params.id)
    .then( () => res.sendStatus(204))
    .catch(err => next(err));
});

module.exports = beerRouter;
    