'use strict';

const uuidv4 = require('uuid/v4');
const createError = require('http-errors');
const debug = require('debug')('car:car');
const storage = require('../lib/storage.js');

const Car = module.exports = function(make, model, year){
  debug('Car constructor');
  if(!make) throw createError(400, new Error('bad request: expected make'));
  if(!model) throw createError(400, new Error('bad request: expected model'));
  if(!year) throw createError(400, new Error('bad request: expected year'));

  this.id = uuidv4();
  this.make = make;
  this.model = model;
  this.year = year;
};

Car.createCar = function(_car){
  debug('createCar');
  try{
    let car = new Car(_car.make, _car.model, _car.year);
    return storage.createItem('car', car);
  } catch(err) {
    return Promise.reject(err);
  }
};

Car.fetchCar = function(id){
  debug('fetchCar');
  return storage.fetchItem('car', id);
};

Car.updateCar = function(id, _car){
  debug('updateCar');

  return storage.fetchItem('car', id)
    .then( car => {
      for(var prop in car){
        if(prop === id) continue;
        if(_car[prop]) car[prop] = _car[prop];
      }
      return storage.createItem('car', car);
    })
    .catch( err => Promise.reject(createError(404, err.message)));
};

Car.deleteCar = function(id){
  debug('deleteCar');
  return storage.deleteItem('car', id);
};

Car.lookupCarIds = function(){
  debug('lookupCarIds');
  try{
    let list = storage.listItemIds('car');
    return list;
  } catch(err) {
    return Promise.reject(err);
  }
};