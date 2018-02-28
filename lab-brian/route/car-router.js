'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const debug = require('debug')('car:car-router');
const Car = require('../model/car.js');
const carRouter = new Router();

// http POST :3000/api/car make=chevy model=tahoe
carRouter.post('/api/car', jsonParser, function(req, res, next) {
  debug('POST: /api/car');

  Car.createCar(req.body)
    .then( car => res.json(car))
    .catch( err => next(err));
});

// http :3000/api/car/a31df699-f06a-4292-919e-384670e82040  
carRouter.get('/api/car/:carId', function(req, res, next) {
  debug('GET: /api/car/:carId');

  Car.fetchCar(req.params.carId)
    .then( car => res.json(car))
    .catch( err => next(err));
});

carRouter.get('/api/car', function(req, res, next) {
  debug('GET: api/car');

  Car.fetchIDs()
    .then( ids => res.json(ids))
    .catch( err => next(err));
});

// http PUT :3000/api/car/a31df699-f06a-4292-919e-384670e82040 make=updated model=updated
carRouter.put('/api/car/:carId', jsonParser, function(req, res, next) {
  debug('PUT: /api/car/:carId');

  Car.updateCar(req.params.carId, req.body)
    .then( car => res.json(car))
    .catch( err => next(err));
});

carRouter.delete('/api/car/:carId', function(req, res, next) {
  debug('DELETE: /api/car/:carId');

  Car.deleteCar(req.params.carId)
    .then( () => {
      res.writeHead(204, {
        'Content-Type': 'application/json',
      });
      res.end();
    })
    .catch( err => next(err));
});

module.exports = carRouter;