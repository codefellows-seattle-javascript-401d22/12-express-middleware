'use strit';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const debug = require('debug')('car:car-router');
const Car = require('../model/car.js');

const carRouter  = module.exports = new Router();

carRouter.post('/api/car', jsonParser, function(req, res, next){
  debug('Post: /api/car');

  Car.createCar(req.body)
    .then(car => res.json(car))
    .catch(err => next(err));
});

carRouter.get('/api/car/:id', function(req, res, next){
  debug('Get: /api/car/:id');

  Car.fetchCar(req.params.id)
    .then(car => res.json(car))
    .catch(err => next(err));
});

carRouter.get('/api/car', function(req, res, next){
  debug('GET: /api/car');

  Car.fetchIds()
    .then( ids => res.json(ids))
    .catch(err => next(err));
});

carRouter.put('/api/car/:id', jsonParser, function(req, res, next){
  debug('PUT: /api.car/:id');

  Car.updateCar(req.params.id, req.body)
    .then( car => res.json(car))
    .catch(err => next(err));
});
 