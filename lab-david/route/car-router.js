'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const debug = require('debug')('car:car-router');
const Car = require('../model/car.js');
const carRouter = new Router();

carRouter.post('/api/car', jsonParser, (req,res,next) => {
  debug('POST: /api/car');

  Car.createCar(req.body)
    .then( car => res.json(car))
    .catch(err => next(err));
});

carRouter.get('/api/car/:carId', (req,res,next) => {
  debug('GET: /api/car/:carId');

  Car.fetchCar(req.params.carId)
    .then(car => res.json(car))
    .catch( err => next(err));
});

carRouter.get('/apir/car', (req,res,next) => {
  debug('GET: /api/car');

  Car.lookupCarIds()
    .then( list => res.json(list))
    .catch(err => next(err));
});

carRouter.put('/api/car/:carId', jsonParser, (req,res,next) => {
  debug('PUT: /api/car/:carId');

  Car.updateCar(req.params.carId, req.body)
    .then( car => res.json(car))
    .catch( err => next(err));
});

carRouter.delete('/api/car/:carId', (req,res,next) => {
  debug('DELETE: /api/car/:carId');

  Car.deleteCar(req.params.carId)
    .catch(err => next(err));
});

module.exports = carRouter;