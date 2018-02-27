'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const debug = require('debug')('dog:dog-router');
const Dog = require('../model/dog.js');
const dogRouter = new Router();

dogRouter.post('/api/dog', jsonParser, function(req, res, next) {
  debug('POST: /api/dog');
  Dog.createDog(req.body)
    .then(dog => res.json(dog))
    .catch(err => next(err));
});

dogRouter.get('/api/dog/:id', function(req, res, next) {
  debug('GET: /api/dog/:id');

  Dog.fetchDog(req.params.id)
    .then(dog => res.json(dog))
    .catch(err => next(err));
});

dogRouter.get('/api/dog', function(req, res, next) {
  debug('GET: /api/dog');
  Dog.fetchIDs()
    .then(ids => res.json(ids))
    .catch(err => next(err));
});

dogRouter.put('/api/dog/:id', jsonParser, function(req, res, next) {
  debug('PUT: /api/dog/:id');

  Dog.updateDog(req.params.id, req.body)
    .then(dog => res.json(dog))
    .catch(err => next(err));
});

dogRouter.delete('/api/dog/:id', function(req, res, next) {
  debug('DELETE: /api/dog/:id');
});

module.exports = dogRouter;