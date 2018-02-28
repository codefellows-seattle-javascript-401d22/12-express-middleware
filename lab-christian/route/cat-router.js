'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const debug = require('debug')('cat:cat-router');
const Cat = require('../model/cat');

const catRouter = new Router();

catRouter.post('/api/cat', jsonParser, function(req, res, next) {
  debug('POST: /api/cat');
  Cat.create(req.body)
    .then( cat => res.json(cat))
    .catch( err=> next(err));
});

catRouter.get('/api/cat/:id', function(req, res, next) {
  debug('GET: /api/cat/:id');

  Cat.fetch(req.params.id)
    .then( cat => res.json(cat))
    .catch( err => next(err));
});

catRouter.get('/api/cat', function(req, res, next) {
  debug('GET: /api/cat');
  Cat.fetchAll()
    .then( ids => res.json(ids))
    .catch( err => next(err));
});

catRouter.put('/api/cat/:id', jsonParser, function(req, res, next) {
  debug('PUT: /api/cat/:id');

  Cat.update(req.params.id, req.body)
    .then( cat => res.json(cat))
    .catch( err => next(err));
});

catRouter.delete('/api/cat/:id', function(req, res, next) {
  debug('DELETE: /api/cat/:id');

  Cat.delete(req.params.id);
});

module.exports = catRouter;