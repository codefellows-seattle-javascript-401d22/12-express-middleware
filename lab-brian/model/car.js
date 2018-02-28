'use strict';

const uuidv4 = require('uuid/v4');
const createError = require('http-errors');
const debug = require('debug')('car:car');
const storage = require('../lib/storage.js');

const Car = module.exports = function(make, model) {
  debug('car constructor');

  if(!make) throw new Error('expected make');
  if(!model) throw new Error('expecte model');

  this.id = uuidv4();
  this.make = make;
  this.model = model;
};

Car.createCar = function(_car) {
  debug('createCar');
  console.log(_car);
  try {
    let car = new Car(_car.make, _car.model);
    console.log(_car);
    return storage.createItem('car', car);
  } catch (err) {
    return Promise.reject(err);
  }
};

Car.fetchCar = function(id) {
  debug('fetchCar');
  console.log(id);
  return storage.fetchItem('car', id);
};

Car.updateCar = function(id, _car) {
  debug('updateCar');
  return storage.fetchItem('car', id)
    .then( car => {
      for(var prop in car) {
        if(prop === 'id') continue;
        if(_car[prop]) car[prop] = _car[prop];
      }
      return storage.createItem('car', car);
    })
    .catch( err => Promise.reject(createError(404, err.message)));
};

Car.deleteCar = function(id) {
  debug('deleteCar');
  return storage.deleteItem('car', id);
};

Car.fetchIDs = function() {
  debug('fetchIds');
  return storage.availIds('car');
};
